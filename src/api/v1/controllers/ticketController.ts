import { Request, Response } from 'express';
import * as TicketService from '../services/ticketService';
import { HTTP_STATUS } from 'src/constants/httpStatuses';

export const getAll = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ data: TicketService.getAllTickets() });
};

export const getById = (req: Request, res: Response) => {
  const ticket = TicketService.getTicketById(parseInt(req.params.id));
  if (!ticket) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  res.status(HTTP_STATUS.OK).json({ data: ticket });
};

export const create = (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  if (!title) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: title" });
  if (!description) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Missing required field: description" });
  if (!['critical', 'high', 'medium', 'low'].includes(priority)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
  }
  const ticket = TicketService.createTicket({ title, description, priority });
  res.status(HTTP_STATUS.CREATED).json(ticket);
};

export const update = (req: Request, res: Response) => {
  const { priority, status } = req.body;
  const validPriorities = ['critical', 'high', 'medium', 'low'];
  const validStatuses = ['open', 'in-progress', 'resolved'];

  if (priority && !validPriorities.includes(priority)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });
  }
  if (status && !validStatuses.includes(status)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid status. Must be one of: open, in-progress, resolved" });
  }

  const updated = TicketService.updateTicket(parseInt(req.params.id), req.body);
  if (!updated) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  res.status(HTTP_STATUS.OK).json(updated);
};

export const remove = (req: Request, res: Response) => {
  const success = TicketService.deleteTicket(parseInt(req.params.id));
  if (!success) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  res.status(HTTP_STATUS.NO_CONTENT).send();
};

export const getUrgency = (req: Request, res: Response) => {
  const data = TicketService.calculateUrgency(parseInt(req.params.id));
  if (!data) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
  res.status(HTTP_STATUS.OK).json({ message: "Ticket urgency calculated", data });
};