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

  create = (req: Request, res: Response) => {
    const { title, description, priority } = req.body;
    if (!title) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
    if (!description) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
    if (!['critical', 'high', 'medium', 'low'].includes(priority)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
    }
    res.status(HTTP_STATUS.CREATED).json(service.create(req.body));
  };

  delete = (req: Request, res: Response) => {
    const success = service.delete(parseInt(req.params.id));
    if (!success) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    res.status(HTTP_STATUS.NO_CONTENT).send();
  };