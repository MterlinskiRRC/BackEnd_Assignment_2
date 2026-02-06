import { tickets } from "../../data/tickets";

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'open' | 'in-progress' | 'resolved';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}
