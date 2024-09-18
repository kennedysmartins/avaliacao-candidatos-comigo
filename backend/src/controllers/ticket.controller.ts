import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { Prisma, Ticket, TicketStatus, TicketType } from "@prisma/client";

export const getTickets = async (
  req: Request,
  res: Response
): Promise<void> => {
  const whereClause: Prisma.TicketWhereInput = {
    deletedAt: null,
  };

  if (req.query.status) {
    whereClause.status = req.query.status as TicketStatus;
  }

  if (req.query.type) {
    whereClause.type = req.query.type as TicketType;
  }

  if (req.query.reason) {
    whereClause.reason = req.query.reason as string;
  }

  if (req.query.customer) {
    whereClause.customer = req.query.customer as string;
  }

  if (req.query.vehicle) {
    whereClause.vehicle = req.query.vehicle as string;
  }

  if (req.query.createdAt_gte) {
    whereClause.createdAt = {
      gte: new Date(req.query.createdAt_gte as string),
    };
  }
  if (req.query.createdAt_lte) {
    whereClause.createdAt = {
      lte: new Date(req.query.createdAt_lte as string),
    };
  }

  if (req.query.search) {
    whereClause.OR = [
      {
        reason: {
          contains: req.query.search as string,
        },
      },
      {
        description: {
          contains: req.query.search as string,
        },
      },
    ];
}

  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const limit = parseInt(req.query.limit as string) || pageSize;
    const skip = (page - 1) * pageSize;

    const count = await prisma.ticket.count({
      where: whereClause,
    });

    const tickets: Ticket[] = await prisma.ticket.findMany({
      where: whereClause,
      orderBy: {
        createdAt: (req.query.orderBy as "asc" | "desc") || "desc",
      },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.status(200).json({
      count,
      tickets,
      page,
      totalPages,
      pageSize,
      limit,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTicketById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket: Ticket | null = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      type,
      description,
      reason,
      customer,
      vehicle,
      passiveContact,
      contactType,
      deadline,
      userId,
    } = req.body;

    const data: Prisma.TicketCreateInput = {
      type: type as TicketType,
      description,
      reason,
      customer,
      vehicle,
      passiveContact,
      contactType,
      deadline,
      status: "OPEN" as TicketStatus,
      assignedTo: userId ? { connect: { id: userId } } : undefined,
    };

    const ticket = await prisma.ticket.create({ data });
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = req.params.id;
    const {
      type,
      description,
      reason,
      customer,
      vehicle,
      passiveContact,
      contactType,
      deadline,
    } = req.body;

    const ticket = await prisma.ticket.update({
      where: { id: Number(ticketId) },
      data: {
        type: type as TicketType,
        description,
        reason,
        customer,
        vehicle,
        passiveContact,
        contactType,
        deadline,
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({
      error: "Internal server error",
      message: (error as Error).message,
    });
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const deletedTicket: Ticket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        deletedAt: new Date(),
      },
    });
    res.status(200).json(deletedTicket);
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const restoreTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const restoredTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        deletedAt: null,
      },
    });
    res.status(200).json(restoredTicket);
  } catch (error) {
    console.error("Error restoring ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
