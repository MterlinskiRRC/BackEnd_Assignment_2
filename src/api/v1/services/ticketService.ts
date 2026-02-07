import { tickets, Ticket, Priority } from "../../../data/tickets";

// Track the next ID to assign to new tickets
let nextId = tickets.length > 0 ? Math.max(...tickets.map((t: Ticket) => t.id)) + 1 : 1;

// Retrieve all tickets
export const getAllTickets = (): Ticket[] => {
  return [...tickets] as Ticket[];
};

// Find a ticket by ID
export const getTicketById = (id: number): Ticket | undefined => {
  return tickets.find((t: Ticket) => t.id === id) as Ticket | undefined;
};

// Create a new ticket with provided data
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

// Update a ticket with partial data
export const updateTicket = (id: number, updates: Partial<Ticket>): Ticket | null => {
  const index = tickets.findIndex((t: Ticket) => t.id === id);
  if (index === -1) return null;
  tickets[index] = { ...tickets[index], ...updates };
  return tickets[index] as Ticket;
};

// Delete a ticket by ID
export const deleteTicket = (id: number): boolean => {
  const index = tickets.findIndex((t: Ticket) => t.id === id);
  if (index === -1) return false;
  tickets.splice(index, 1);
  return true;
};

// Calculate urgency score based on priority and age of ticket
export const calculateUrgency = (id: number) => {
  const ticket = getTicketById(id);
  if (!ticket) return null;


// This one took a LONG time because the datetime works in millieseconds and math sucks
  const ageDays = Math.floor((new Date().getTime() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const baseScores: Record<Priority, number> = { critical: 50, high: 30, medium: 20, low: 10 };
  
  let score = baseScores[ticket.priority] + (ageDays * 5); 
  if (ticket.status === 'resolved') score = 0;

  let level = "";
  if (ticket.status === 'resolved') level = "Minimal. Ticket resolved.";
  else if (score >= 80) level = "Critical. Immediate attention required.";
  else if (score >= 50) level = "High urgency. Prioritize resolution.";
  else if (score >= 30) level = "Moderate. Schedule for attention.";
  else level = "Low urgency. Address when capacity allows.";

  return { ...ticket, ticketAge: ageDays, urgencyScore: score, urgencyLevel: level };
};
