import express, { Router } from 'express';
import * as healthController from '../controllers/healthController';

const routes: Router = express.Router();

routes.get('/', healthController.check);

export default routes;
