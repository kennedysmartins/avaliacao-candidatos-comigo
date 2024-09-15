"use server";
import axios from "axios";
import axiosInstance from "./axiosInstance";
import { getTicketsOutput, Ticket, User } from "./types";

const API_BASE_URL = process.env.BACKEND_URL || "http://localhost:4000";
export const loginRequest = async (credentials: {
  email: string;
  password: string;
}): Promise<{ data: string } | { data: null }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    if (typeof response.data === "string") {
      return { data: response.data };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Login error:", error);
    return { data: null };
  }
};

export const createUser = async (
  userData: Omit<User, "id" | "tickets">
): Promise<{ data: User }> => {
  try {
    return await axiosInstance.post(`${API_BASE_URL}/users`, userData);
  } catch (error) {
    console.error("Create user error:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<{ data: User[] }> => {
  try {
    return await axiosInstance.get(`${API_BASE_URL}/users`);
  } catch (error) {
    console.error("Get users error:", error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<{ data: User }> => {
  try {
    return await axiosInstance.get(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error("Get user by ID error:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userData: Partial<Omit<User, "id" | "tickets">>
): Promise<{ data: User }> => {
  try {
    return await axiosInstance.put(`${API_BASE_URL}/users/${id}`, userData);
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<User> => {
  try {
    return await axiosInstance.delete(`${API_BASE_URL}/users/${id}`);
  } catch (error) {
    console.error("Delete user error:", error);
    throw error;
  }
};

export const getTickets = async ({
  queryParams,
}: {
  queryParams: string;
}): Promise<getTicketsOutput> => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/tickets?${queryParams}`
    );
    return {
      tickets: response.data.tickets,
      count: response.data.count,
      page: response.data.page,
      totalPages: response.data.totalPages,
      pageSize: response.data.pageSize,
    };
  } catch (error) {
    console.error("Get tickets error:", error);
    throw error;
  }
};

export const getTicketById = async (id: string): Promise<{ data: Ticket }> => {
  try {
    return await axiosInstance.get(`${API_BASE_URL}/tickets/${id}`);
  } catch (error) {
    console.error("Get ticket by ID error:", error);
    throw error;
  }
};

export const createTicket = async (
  ticketData: Omit<
    Ticket,
    "id" | "createdAt" | "updatedAt" | "deletedAt" | "status"
  >
): Promise<Ticket> => {
  try {
    console.log("Creating ticket with data:", ticketData);
    const response = await axiosInstance.post(
      `${API_BASE_URL}/tickets`,
      ticketData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Create ticket error:", error);
    throw error;
  }
};

export const updateTicket = async (
  id: string,
  ticketData: Partial<
    Omit<Ticket, "id" | "createdAt" | "updatedAt" | "deletedAt">
  >
): Promise<Ticket> => {
  try {
    console.log("Updating ticket with data:", ticketData);
    const response = await axiosInstance.put(
      `${API_BASE_URL}/tickets/${id}`,
      ticketData
    );
    return response.data;
  } catch (error) {
    console.error("Update ticket error:", error);
    throw error;
  }
};

export const deleteTicket = async (
  id: string
): Promise<{ data: { success: boolean } }> => {
  try {
    return await axiosInstance.delete(`${API_BASE_URL}/tickets/${id}`);
  } catch (error) {
    console.error("Delete ticket error:", error);
    throw error;
  }
};
