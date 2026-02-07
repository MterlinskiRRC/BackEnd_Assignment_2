import express, { Express } from 'express';
import ticketRoutes from './api/v1/routes/ticketRoutes';
import healthRoutes from './api/v1/routes/healthRoutes';
import morgan from "morgan";

const app: Express = express();
app.use(express.json());
app.use(morgan("combined"));

// Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/tickets', ticketRoutes);

export default app;
