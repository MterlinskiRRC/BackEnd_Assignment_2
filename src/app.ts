import express, { Express } from 'express';
import ticketRoutes from './api/v1/routes/ticketRoutes';
import healthRoutes from './api/v1/routes/healthRoutes';
import morgan from "morgan";

// Initialize Express application
const app: Express = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Middleware: Log HTTP requests using Morgan
app.use(morgan("combined"));

// API Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/tickets', ticketRoutes);

export default app;
