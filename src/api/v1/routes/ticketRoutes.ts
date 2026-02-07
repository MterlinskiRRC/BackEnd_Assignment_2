import { Router } from 'express';
import * as TicketController from '../controllers/ticketController';

// Router for ticket-related endpoints
const router = Router();

// Ticket routes
router.get('/', TicketController.getAll);              // GET all tickets
router.post('/', TicketController.create);              // POST create new ticket
router.get('/:id', TicketController.getById);           // GET ticket by ID
router.put('/:id', TicketController.update);            // PUT update ticket
router.delete('/:id', TicketController.remove);         // DELETE ticket
router.get('/:id/urgency', TicketController.getUrgency); // GET ticket urgency score

export default router;