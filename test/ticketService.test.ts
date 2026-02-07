import { calculateUrgency, createTicket, updateTicket } from '../src/api/v1/services/ticketService';

describe('Ticket Service', () => {
    beforeEach(() => {
    });

  describe('calculateUrgency', () => {
    it('should return a critical urgency level for a high score', () => {
        const ticket = createTicket({
            title: 'Test Ticket',
            description: 'A test ticket',
            priority: 'critical',
        });

        const result = calculateUrgency(ticket.id);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.urgencyLevel).toBe("High urgency. Prioritize resolution.");
        }
    });

    it('should return a moderate urgency level for a medium priority', () => {
        const ticket = createTicket({
            title: 'Test Ticket',
            description: 'A test ticket',
            priority: 'medium',
        });
        updateTicket(ticket.id, { createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() });

        const result = calculateUrgency(ticket.id);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
        }
    });

    it('should return a moderate urgency level for a low score', () => {
        const ticket = createTicket({
            title: 'Test Ticket',
            description: 'A test ticket',
            priority: 'medium',
        });

        const result = calculateUrgency(ticket.id);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
        }
    });

    it('should return a low urgency level for a very low score', () => {
        const ticket = createTicket({
            title: 'Test Ticket',
            description: 'A test ticket',
            priority: 'low',
        });

        const result = calculateUrgency(ticket.id);
        expect(result).not.toBeNull();
        if (result) {
            expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
        }
    });
  });
});