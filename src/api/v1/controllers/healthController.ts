import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../constants/httpStatuses';

// Health check endpoint - returns server status and uptime
export const check = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
};
