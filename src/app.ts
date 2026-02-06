import express, { Express } from 'express';
import ticketRoutes from './api/v1/routes/ticketRoutes';
import { HTTP_STATUS } from '././constants/httpStatuses';
import morgan from "morgan";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});


// Routes
app.use('/api/v1/tickets', ticketRoutes);

export default app;
