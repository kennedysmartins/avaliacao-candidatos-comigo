import express from "express"
import * as ticketController from "../controllers/ticket.controller"
import verifyToken from "@/middlewares/authMiddleware";
import { validateData } from "@/middlewares/validationMiddleware";
import { ticketSchema } from "@/schemas/ticketSchemas";

const router = express.Router()

router.use(verifyToken).get("/", ticketController.getTickets);
router.use(verifyToken).get("/:id", ticketController.getTicketById);
router.use(verifyToken).post("/", validateData(ticketSchema), ticketController.createTicket);
router.use(verifyToken).put("/:id", validateData(ticketSchema), ticketController.updateTicket);
router.use(verifyToken).patch("/:id/restore", ticketController.restoreTicket);
router.use(verifyToken).delete("/:id", ticketController.deleteTicket);

export default router
