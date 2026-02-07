import request from "supertest";
import express from "express";
import ticketRoutes from "../src/api/v1/routes/ticketRoutes";
import * as ticketController from "../src/api/v1/controllers/ticketController";

const mockedTicketController = ticketController as {
    [K in keyof typeof ticketController]: jest.Mock
};


jest.mock("../src/api/v1/controllers/ticketController");

const app = express();
app.use(express.json());
app.use("/api/v1/tickets", ticketRoutes);

describe("Ticket Routes", () => {
	beforeAll(() => {
        (mockedTicketController.getAll as jest.Mock).mockImplementation((req, res) => res.status(200).send());
        (mockedTicketController.getById as jest.Mock).mockImplementation((req, res) => res.status(200).send());
        (mockedTicketController.create as jest.Mock).mockImplementation((req, res) => res.status(201).send());
        (mockedTicketController.update as jest.Mock).mockImplementation((req, res) => res.status(200).send());
        (mockedTicketController.remove as jest.Mock).mockImplementation((req, res) => res.status(204).send());
    });

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("GET /api/v1/tickets", () => {
		it("should call getAllTickets controller", async () => {
			await request(app).get("/api/v1/tickets");
			expect(mockedTicketController.getAll).toHaveBeenCalled();
		});
	});

    
});
