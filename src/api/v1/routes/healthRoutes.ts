import express, { Router } from 'express';
import * as healthController from '../controllers/healthController';

// Router for health check endpoint
const routes: Router = express.Router();

// Health check route
routes.get('/', healthController.check); // GET health status

export default routes;
