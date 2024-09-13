import express from "express"
import * as ticketController from "../controllers/ticket.controller"
import verifyToken from "@/middlewares/authMiddleware";

const router = express.Router()

router.use(verifyToken).get("/", ticketController.getTickets);
router.use(verifyToken).get("/:id", ticketController.getTicketById);
router.use(verifyToken).post("/", ticketController.createTicket);
router.use(verifyToken).put("/:id", ticketController.updateTicket);
router.use(verifyToken).delete("/:id", ticketController.deleteTicket);

export default router
