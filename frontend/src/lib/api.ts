"use client"
import axios from 'axios';
import { getTicketsOutput, Ticket, User } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const login = async (credentials: { email: string; password: string }): Promise<{ data: { token: string } }> => {
  try {
    return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const verifyToken = async (token: string): Promise<{ data: { valid: boolean } }> => {
  try {
    return await axios.post(`${API_BASE_URL}/auth/verifyToken`, { token });
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

// User endpoints
export const createUser = async (userData: Omit<User, 'id' | 'tickets'>, token: string): Promise<{ data: User }> => {
  try {
    return await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

export const getUsers = async (token: string): Promise<{ data: User[] }> => {
  try {
    return await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

export const getUserById = async (id: string, token: string): Promise<{ data: User }> => {
  try {
    return await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id' | 'tickets'>>, token: string): Promise<{ data: User }> => {
  try {
    return await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

export const deleteUser = async (id: string, token: string): Promise<User> => {
  try {
    return await axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

export const getTickets = async ({queryParams, token}:{queryParams: string, token: string}): Promise<getTicketsOutput> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tickets?${queryParams}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { tickets: response.data.tickets, count: response.data.count, page: response.data.page, totalPages: response.data.totalPages, pageSize: response.data.pageSize };
  } catch (error) {
    console.error('Get tickets error:', error);
    throw error;
  }
};

export const getTicketById = async (id: string, token: string): Promise<{ data: Ticket }> => {
  try {
    return await axios.get(`${API_BASE_URL}/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Get ticket by ID error:', error);
    throw error;
  }
};

export const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>, token: string): Promise<{ data: Ticket }> => {
  try {
    return await axios.post(`${API_BASE_URL}/tickets`, ticketData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Create ticket error:', error);
    throw error;
  }
};

export const updateTicket = async (id: string, ticketData: Partial<Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>, token: string): Promise<{ data: Ticket }> => {
  try {
    return await axios.put(`${API_BASE_URL}/tickets/${id}`, ticketData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Update ticket error:', error);
    throw error;
  }
};

export const deleteTicket = async (id: string, token: string): Promise<{ data: { success: boolean } }> => {
  try {
    return await axios.delete(`${API_BASE_URL}/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Delete ticket error:', error);
    throw error;
  }
};
