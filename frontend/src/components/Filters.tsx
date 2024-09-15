"use client";
import { useState, useCallback } from "react";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getTicketsInput } from "@/lib/types";

interface FiltersProps {
  onFiltersChange: (filters: getTicketsInput["filters"]) => void;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    orderBy: searchParams.get("orderBy") || "",
    status: searchParams.get("status") || "",
    type: searchParams.get("type") || "",
    reason: searchParams.get("reason") || "",
    client: searchParams.get("client") || "",
    vehicle: searchParams.get("vehicle") || "",
    createdAt_gte: searchParams.get("createdAt_gte") || "",
    createdAt_lte: searchParams.get("createdAt_lte") || "",
  });

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [key]: value,
      };

      if (key === "periodo" && value === "Hoje") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        newFilters.createdAt_gte = today.toISOString();
        newFilters.createdAt_lte = tomorrow.toISOString();
      } else if (key === "periodo" && value !== "Hoje") {
        newFilters.createdAt_gte = "";
        newFilters.createdAt_lte = "";
      }

      return newFilters;
    });

    const newFilters: { [key: string]: string } = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newFilters[key] = value;
      }
    });
    onFiltersChange(newFilters);
    router.push(pathname + "?" + createQueryString(key, value));
  };

  const renderDropdown = (label: string, options: string[]) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(label)}
        className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span>{filters[label.toLowerCase() as keyof typeof filters] || label}</span>
        <FiChevronDown className="w-4 h-4 ml-2 text-gray-400" aria-hidden="true" />
      </button>

      {openDropdown === label && (
        <div className="absolute z-10 w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-primary ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <Link
                key={index}
                href={pathname + "?" + createQueryString(label.toLowerCase(), option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                onClick={() => handleFilterChange(label.toLowerCase(), option)}
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const clearFilters = () => {
    setFilters({
      search: "",
      orderBy: "",
      status: "",
      type: "",
      reason: "",
      client: "",
      vehicle: "",
      createdAt_gte: "",
      createdAt_lte: "",
    });
    onFiltersChange({});
    router.push(pathname);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Pesquisar"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {renderDropdown("Periodo", ["Hoje", "Esta semana", "Este mês"])}
        {renderDropdown("Ordenado por", ["Data da abertura", "Data de fechamento"])}
        {renderDropdown("Status", ["Em andamento", "Concluído", "Cancelado"])}
        {renderDropdown("Tipo", ["Tipo 1", "Tipo 2", "Tipo 3"])}
        {renderDropdown("Motivo", ["Motivo 1", "Motivo 2", "Motivo 3"])}
        {renderDropdown("Cliente", ["Cliente 1", "Cliente 2", "Cliente 3"])}
        {renderDropdown("Veículo", ["Veículo 1", "Veículo 2", "Veículo 3"])}

        <button
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={clearFilters}
        >
          <FiX className="w-4 h-4 mr-2 text-gray-400" />
          Remover filtros
        </button>
      </div>
    </div>
  );
}
