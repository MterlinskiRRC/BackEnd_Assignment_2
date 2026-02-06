import { tickets, Ticket, Priority } from "../../../../data/tickets";

let nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

export const getAllTickets = (): Ticket[] => {
  return tickets;
};

export const getTicketById = (id: number): Ticket | undefined => {
  return tickets.find(t => t.id === id);
};

export const createTicket = (data: { title: string; description: string; priority: Priority }): Ticket => {
  const newTicket: Ticket = {
    id: nextId++,
    ...data,
    status: 'open',
    createdAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  return newTicket;
};

export const updateTicket = (id: number, updates: Partial<Ticket>): Ticket | null => {
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return null;
  tickets[index] = { ...tickets[index], ...updates };
  return tickets[index];
};

export const deleteTicket = (id: number): boolean => {
  const index = tickets.findIndex(t => t.id === id);
  if (index === -1) return false;
  tickets.splice(index, 1);
  return true;
};

export const calculateUrgency = (id: number) => {
  const ticket = getTicketById(id);
  if (!ticket) return null;

  const ageDays = Math.floor((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const baseScores: Record<Priority, number> = { critical: 50, high: 30, medium: 20, low: 10 };
  
  let score = baseScores[ticket.priority] + (ageDays * 5); 
  if (ticket.status === 'resolved') score = 0;

  let level = "";
  if (ticket.status === 'resolved') level = "Minimal. Ticket resolved.";
  else if (score >= 80) level = "Critical. Immediate attention required.";
  else if (score > 50) level = "High urgency. Prioritize resolution.";
  else if (score >= 30) level = "Moderate. Schedule for attention.";
  else level = "Low urgency. Address when capacity allows.";

  return { ...ticket, ticketAge: ageDays, urgencyScore: score, urgencyLevel: level };
};
