import { Router } from 'express';
import * as TicketController from '../controllers/ticketController';

const router = Router();

router.get('/', TicketController.getAll);
router.post('/', TicketController.create);
router.get('/:id', TicketController.getById);
router.put('/:id', TicketController.update);
router.delete('/:id', TicketController.remove);
router.get('/:id/urgency', TicketController.getUrgency);

export default router;