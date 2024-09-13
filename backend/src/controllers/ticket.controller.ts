import { Request, Response } from 'express';
import prisma from "../lib/prisma";
import { Ticket } from '@prisma/client';

export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets: Promise<Ticket[]> = prisma.ticket.findMany({
      where: {
        deletedAt: null
      }
    });
    res.json(await tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket: Promise<Ticket | null> = prisma.ticket.findUnique({
      where: { id: ticketId},
    });
    res.json(await ticket);
  } catch (error) {
    console.error('Error fetching ticket by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, description, assignedTo, reason, customer, vehicle, passiveContact, contactType, deadline } = req.body;
    const ticket: Promise<Ticket> = prisma.ticket.create({
      data: {
        type,
        description,
        assignedTo,
        reason,
        customer,
        vehicle,
        passiveContact,
        contactType,
        deadline,
        status: "OPEN"
      },
    });
    res.json(await ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const { type, description, status, assignedTo, reason, customer, vehicle, passiveContact, contactType, deadline } = req.body;
    const ticket: Promise<Ticket> = prisma.ticket.update({
      where: { id: ticketId },
      data: {
        type,
        description,
        assignedTo,
        reason,
        customer,
        vehicle,
        passiveContact,
        contactType,
        deadline,
        status,
      },
    });
    res.json(await ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id);
    const deletedTicket: Promise<Ticket> = prisma.ticket.update({
      where: { id: ticketId },
      data: {
        deletedAt: new Date(),
      },
    });
    res.json(await deletedTicket);
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};