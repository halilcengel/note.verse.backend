import { NextFunction, Request, Response } from 'express';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': 
        return res.status(409).json({ status: 'error', message: 'A record with this information already exists', field: err.meta?.target });
      case 'P2025': 
        return res.status(404).json({ status: 'error', message: 'Record not found' });
      case 'P2003': 
        return res.status(400).json({ status: 'error', message: 'Foreign key constraint failed' });
      default:
        return res.status(400).json({ status: 'error', message: 'Database operation failed' });
    }
  }
  if (err.isJoi) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors: err.details.map((detail: any) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};




