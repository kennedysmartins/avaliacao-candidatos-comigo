"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Filters from "../Filters";
import TicketTable from "./TicketTable";
import { BsPlus } from "react-icons/bs";
import { deleteTicketApi, getTickets, undoDeletedTicketApi } from "@/lib/api";
import { getTicketsInput, Ticket } from "@/lib/types";
import Pagination from "../Pagination";
import Modal from "../Modal";
import FormAddTicket from "./FormAddTicket";
import FormEditTicket from "./FormEditTicket";
import { toast } from "sonner";

const AtendimentoCliente = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<getTicketsInput["filters"]>({});
  const [view, setView] = useState<"list" | "grid">("list");
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

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // @ts-expect-error temporary
      const queryString = new URLSearchParams({
        ...filters,
        page: String(pagination.page),
        pageSize: String(pagination.pageSize),
      }).toString();

      const response = await getTickets({
        queryParams: queryString,
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

  const deleteTicket = async (ticketId: string) => {
    try {
      const response = await deleteTicketApi(ticketId);
      if (response.id) {
        toast.success("Ticket excluído com sucesso!", {
          duration: 5000,
          action: {
            label: "Restaurar",
            onClick: async () => {
              await undoDeletedTicket(ticketId);
            },
          },
        });
        fetchTickets();
      }
    } catch (error) {
      console.error("Erro ao excluir ticket:", error);
    }
  };

  const undoDeletedTicket = async (ticketId: string) => {
    try {
      const response = await undoDeletedTicketApi(ticketId);
      if (response.id) {
        toast.success("Ticket restaurado com sucesso!");
        fetchTickets();
      }
    } catch (error) {
      console.error("Erro ao restaurar ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filters, pagination.page, pagination.pageSize]);

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
    <div className='px-8 mb-12'>
      <div className='flex gap-2 justify-start items-center'>
        <Button
          variant='filled'
          iconPosition='right'
          icon={<BsPlus size={20} />}
          onClick={handleOpenAddModal}
        >
          Abrir ticket
        </Button>
        <Filters
          onFiltersChange={handleFiltersChange}
          onViewChange={setView}
          view={view}
        />
      </div>
      <TicketTable
        tickets={loading ? emptyTickets : tickets}
        loading={loading}
        view={view}
        onEdit={handleOpenEditModal}
        onDelete={(ticket) => {
          deleteTicket(String(ticket.id));
        }}
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
        <FormAddTicket onClose={handleCloseAddModal} />
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <FormEditTicket
          ticket={selectedTicket}
          onClose={handleCloseEditModal}
        />
      </Modal>
    </div>
  );
};

export default AtendimentoCliente;
