import { Request, Response } from "express";
import { ChatRequest } from "../schemas/chatSchema";

const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL || "http://127.0.0.1:8000/chat";

const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const chatRequest: ChatRequest = req.body;

  try {
    const response = await fetch(CHAT_SERVICE_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatRequest)
    });

    if (!response.ok) {
      res.status(response.status).json({
        status: "error",
        message: `Chat service returned status ${response.status}`,
        details: await response.text()
      });
      return;
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response from chat service to client
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            res.end();
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          res.write(chunk);
        }
      } catch (streamError) {
        console.error("Error streaming response:", streamError);
        res.end();
        return;
      }
    } else {
      res.status(500).json({
        status: "error",
        message: "No response body from chat service"
      });
      return;
    }
  } catch (error) {
    console.error("Error communicating with chat service:", error);

    if (!res.headersSent) {
      res.status(500).json({
        status: "error",
        message: "Failed to communicate with chat service",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    } else {
      res.end();
    }
    return;
  }
};

export { sendMessage };
