import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const value = schema.parse(req.body);
      req.body = value;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errorDetails,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const value = schema.parse(req.query);
      req.query = value as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          status: 'error',
          message: 'Query validation failed',
          errors: errorDetails,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const value = schema.parse(req.params);
      req.params = value as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          status: 'error',
          message: 'Params validation failed',
          errors: errorDetails,
        });
        return;
      }

      // Unexpected error
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
};