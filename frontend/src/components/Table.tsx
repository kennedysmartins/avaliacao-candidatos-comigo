"use client";

import { Ticket } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { BiEdit, BiTrash } from "react-icons/bi";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type TicketTableProps = {
  tickets: Ticket[],
  view?: 'list' | 'grid',
  loading?: boolean,
  onEdit: (ticket: Ticket) => void,
  onDelete: (ticket: Ticket) => void
};

const SkeletonRow = () => (
  <tr className="bg-white p-2 my-2 rounded-lg shadow-md">
    {[...Array(9)].map((_, idx) => (
      <td key={idx} className="p-4"><Skeleton /></td>
    ))}
    <td className="p-4"><Skeleton width={50} /></td>
  </tr>
);

const SkeletonGrid = () => (
  <div className="grid grid-cols-3 gap-4">
    {[...Array(6)].map((_, idx) => (
      <div key={idx} className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <Skeleton count={9} />
        <div className="flex items-center justify-start gap-4 mt-2">
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
      </div>
    ))}
  </div>
);

const TicketRow = ({ ticket, onEdit, onDelete }: { ticket: Ticket, onEdit: (ticket: Ticket) => void, onDelete: (ticket: Ticket) => void }) => (
  <tr className="bg-white my-2 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-200">
    <td className="p-4">{ticket.id}</td>
    <td className="p-4">{ticket.type}</td>
    <td className="p-4">{ticket.reason}</td>
    <td className="p-4">{ticket.description}</td>
    <td className="p-4">{ticket.customer}</td>
    <td className="p-4">{ticket.vehicle}</td>
    <td className="p-4">{formatDate(ticket.createdAt)}</td>
    <td className="p-4">{ticket.deadline ? formatDate(ticket.deadline) : "-"}</td>
    <td className="p-4">{ticket.status}</td>
    <td className="p-4 flex items-center gap-4">
      <button className="text-gray-600 hover:text-gray-900" onClick={() => onEdit(ticket)}>
        <BiEdit className="h-5 w-5" />
      </button>
      <button onClick={() => onDelete(ticket)}>
        <BiTrash className="h-5 w-5 text-red-700" />
      </button>
    </td>
  </tr>
);

const TicketGridItem = ({ ticket, onEdit, onDelete }: { ticket: Ticket, onEdit: (ticket: Ticket) => void, onDelete: (ticket: Ticket) => void }) => (
  <div className="bg-white p-4 rounded-lg shadow-md space-y-2 hover:bg-gray-100 transition-colors duration-200">
    <div>ID: {ticket.id}</div>
    <div>Tipo: {ticket.type}</div>
    <div>Motivo: {ticket.reason}</div>
    <div>Descrição: {ticket.description}</div>
    <div>Cliente: {ticket.customer}</div>
    <div>Veículo: {ticket.vehicle}</div>
    <div>Data da abertura: {formatDate(ticket.createdAt)}</div>
    <div>Prazo: {ticket.deadline ? formatDate(ticket.deadline) : "-"}</div>
    <div>Status: {ticket.status}</div>
    <div className="flex items-center gap-4 mt-2">
      <button className="text-gray-600 hover:text-gray-900" onClick={() => onEdit(ticket)}>
        <BiEdit className="h-5 w-5" />
      </button>
      <button onClick={() => onDelete(ticket)}>
        <BiTrash className="h-5 w-5 text-red-700" />
      </button>
    </div>
  </div>
);

export default function TicketTable({ tickets, view = 'list', loading, onEdit, onDelete }: TicketTableProps) {
  if (loading) {
    return view === 'list' ? (
      <table className="w-full">
        <thead>
          <tr>{['ID', 'Tipo', 'Motivo', 'Descrição', 'Cliente', 'Veículo', 'Data da abertura', 'Prazo', 'Status', 'Ações'].map(header => (
            <th key={header} className="p-2 text-left">{header}</th>
          ))}</tr>
        </thead>
        <tbody>{[...Array(10)].map((_, idx) => <SkeletonRow key={idx} />)}</tbody>
      </table>
    ) : <SkeletonGrid />;
  }

  return view === 'list' ? (
    <table className="w-full">
      <thead>
        <tr>{['ID', 'Tipo', 'Motivo', 'Descrição', 'Cliente', 'Veículo', 'Data da abertura', 'Prazo', 'Status', 'Ações'].map(header => (
          <th key={header} className="p-2 text-left">{header}</th>
        ))}</tr>
      </thead>
      <tbody>{tickets.map(ticket => (
        <TicketRow key={ticket.id} ticket={ticket} onEdit={onEdit} onDelete={onDelete} />
      ))}</tbody>
    </table>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {tickets.map(ticket => (
        <TicketGridItem key={ticket.id} ticket={ticket} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
