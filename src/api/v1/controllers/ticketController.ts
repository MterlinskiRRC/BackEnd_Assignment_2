import { Request, Response } from 'express';
import { TicketService, Priority, Status } from '../services/ticketService';
import { HTTP_STATUS } from '../../constants/httpStatuses';

const service = new TicketService();

export class TicketController {
  getAll = (req: Request, res: Response) => res.status(HTTP_STATUS.OK).json({ data: service.getAll() });

  getById = (req: Request, res: Response) => {
    const ticket = service.getById(parseInt(req.params.id));
    if (!ticket) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    res.status(HTTP_STATUS.OK).json({ data: ticket });
  };