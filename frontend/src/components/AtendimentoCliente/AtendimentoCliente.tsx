"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Filters from "../Filters";
import TicketTable from "../Table";
import { BsPlus } from "react-icons/bs";
import { getTickets } from "@/lib/api";
import { getTicketsInput, Ticket } from "@/lib/types";
import Pagination from "../Pagination";
import Modal from "../Modal";
import FormAddTicket from "./FormAddTicket";
import FormEditTicket from "./FormEditTicket";

const AtendimentoCliente = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<getTicketsInput["filters"]>({});
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 1,
    count: 0,
  });

  const fetchTickets = async (appliedFilters: getTicketsInput["filters"]) => {
    try {
      setLoading(true);
      const queryString = new URLSearchParams(appliedFilters as Record<string, string>).toString();
      const response = await getTickets({
        queryParams: queryString,
        token: "",
      });
      setTickets(response.tickets);
      setPagination({
        page: response.page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        count: response.count,
      });
    } catch (error) {
      console.error("Erro ao buscar tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: getTicketsInput["filters"]) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTicket(null);
  };

  const emptyTickets = Array(10).fill({} as Ticket);

  return (
    <div className='px-8'>
      <div className='flex gap-2 justify-start items-center'>
        <Button
          variant='filled'
          iconPosition='right'
          icon={<BsPlus size={20} />}
          onClick={handleOpenAddModal}
        >
          Abrir ticket
        </Button>
        <Filters onFiltersChange={handleFiltersChange} />
      </div>
          <TicketTable
            tickets={loading ? emptyTickets : tickets}
            loading={loading}
            onEdit={handleOpenEditModal}
            onDelete={(ticket) => console.log('Delete ticket:', ticket)}
          />
      <Pagination
        data={tickets}
        count={pagination.count}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        setCurrentPage={(page) => setPagination({ ...pagination, page })}
        pageSize={pagination.pageSize}
        setPageSize={(size) => setPagination({ ...pagination, pageSize: size })}
      />
      <Modal isOpen={isAddModalOpen} onClose={handleCloseAddModal}>
        <FormAddTicket />
      </Modal>
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <FormEditTicket ticket={selectedTicket} />
        </Modal>
    </div>
  );
};
export default AtendimentoCliente;
