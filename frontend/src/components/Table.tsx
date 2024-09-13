"use client";

import { useState } from "react";
import { FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

const tickets = [
  {
    id: 110,
    type: "Suporte",
    reason: "Incidente",
    description: "Veículos sem comunicação",
    client: "Cliente 1",
    vehicle: "Veículo 2, Veículo 6",
    openDate: "02/07/2023",
    deadline: "05/07/2023",
    status: "A fazer",
  },
  {
    id: 111,
    type: "Vendas",
    reason: "Upgrade",
    description: "Upgrade veículo 2",
    client: "Cliente 2",
    vehicle: "Veículo 2",
    openDate: "01/07/2023",
    deadline: "05/07/2023",
    status: "Em andamento",
  },
  {
    id: 112,
    type: "Operacional",
    reason: "Teste de rastreador",
    description: "Testes de instalação - OS 002",
    client: "Cliente 1",
    vehicle: "Veículo 3",
    openDate: "01/07/2023",
    deadline: "05/07/2023",
    status: "Concluído",
  },
];

export default function TicketTable() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-8">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Motivo</th>
            <th className="p-2 text-left">Descrição</th>
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Veículo</th>
            <th className="p-2 text-left">Data da abertura</th>
            <th className="p-2 text-left">Prazo</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="bg-gray-50 rounded-lg mb-2">
              <td className="p-4">{ticket.id}</td>
              <td className="p-4">{ticket.type}</td>
              <td className="p-4">{ticket.reason}</td>
              <td className="p-4">{ticket.description}</td>
              <td className="p-4">{ticket.client}</td>
              <td className="p-4">{ticket.vehicle}</td>
              <td className="p-4">{ticket.openDate}</td>
              <td className="p-4">{ticket.deadline}</td>
              <td className="p-4">{ticket.status}</td>
              <td className="p-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <FiMoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4 w-full">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
            2
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div>Exibindo 3 de 3 do total de 10 registros</div>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
