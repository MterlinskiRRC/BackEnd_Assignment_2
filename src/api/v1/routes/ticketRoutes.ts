import { Router } from 'express';
import { TicketController } from '../controllers/ticketController';

const router = Router();
const controller = new TicketController();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:id/urgency', controller.getUrgency);

export default router;