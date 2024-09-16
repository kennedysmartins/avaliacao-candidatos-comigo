"use client";

import { useState, useCallback, Suspense } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MdMenu, MdOutlineViewKanban } from "react-icons/md";
import { TicketStatus, TicketType } from "@/lib/types";

const vehicles = [
  "Logan",
  "Punto",
  "Gol",
  "Fusca",
  "C4",
  "HB20",
  "Onix",
  "Chevette",
];
const reasons = [
  "Testes de Instalação",
  "Melhorias no veículo",
  "Nova Instalação",
  "Aparelho corrompido",
];
const customers = [
  "Kennedy",
  "Renata",
  "Javi",
  "Rafael",
  "Hanna",
  "Lucas",
  "Amanda",
  "Joyce",
  "Deriki",
  "Rodrigo",
  "Camila",
  "Thiago",
];

interface FiltersProps {
  onFiltersChange: (filters: Record<string, string>) => void;
  onViewChange: (view: "list" | "grid") => void;
  view: "list" | "grid";
}

function ComponentContent({
  onFiltersChange,
  onViewChange,
  view,
}: FiltersProps) {
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
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };

      if (key === "periodo") {
        const today = new Date();
        if (value === "Hoje") {
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          newFilters.createdAt_gte = today.toISOString();
          newFilters.createdAt_lte = tomorrow.toISOString();
        } else if (value === "Esta semana") {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          newFilters.createdAt_gte = weekAgo.toISOString();
          newFilters.createdAt_lte = today.toISOString();
        } else if (value === "Este mês") {
          const monthAgo = new Date(today);
          monthAgo.setDate(today.getDate() - 30);
          newFilters.createdAt_gte = monthAgo.toISOString();
          newFilters.createdAt_lte = today.toISOString();
        } else {
          newFilters.createdAt_gte = "";
          newFilters.createdAt_lte = "";
        }
      }

      if (key === "Ordenado por") {
        newFilters.orderBy = value === "Data da abertura" ? "asc" : "desc";
      }

      return newFilters;
    });

    const validFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) validFilters[key] = value;
    });

    onFiltersChange(validFilters);
    router.push(pathname + "?" + createQueryString(key, value));
  };

  const renderDropdown = (label: string, options: string[]) => (
    <div className='relative'>
      <button
        onClick={() => toggleDropdown(label)}
        className='flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50'
      >
        <span>
          {filters[label.toLowerCase() as keyof typeof filters] || label}
        </span>
        <FiChevronDown
          className='w-4 h-4 ml-2 text-gray-400'
          aria-hidden='true'
        />
      </button>

      {openDropdown === label && (
        <div className='absolute z-10 w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-primary ring-opacity-5'>
          <div className='py-1' role='menu' aria-orientation='vertical'>
            {options.map((option, index) => (
              <Link
                key={index}
                href={
                  pathname +
                  "?" +
                  createQueryString(label.toLowerCase(), option)
                }
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                role='menuitem'
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
    <div className='bg-gray-100 p-4 flex items-center justify-between w-full'>
      <div className='flex flex-wrap items-center gap-2 overflow-hidden flex-nowrap'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='Pesquisar'
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className='w-full py-2 pr-10 pl-4 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <FiSearch className='absolute right-3 top-2.5 h-5 w-5 text-gray-400' />
        </div>

        {renderDropdown("Periodo", ["Hoje", "Esta semana", "Este mês"])}
        {renderDropdown("Ordenado por", ["asc", "desc"])}
        {renderDropdown("Status", Object.values(TicketStatus))}
        {renderDropdown("Tipo", Object.values(TicketType))}
        {renderDropdown("Motivo", reasons)}
        {renderDropdown("Cliente", customers)}
        {renderDropdown("Veículo", vehicles)}

        <div className='bg-gray-300 w-px h-6'></div>
        <button
          className='flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none'
          onClick={clearFilters}
        >
          Remover filtros
        </button>
      </div>
      <div className='flex gap-2 items-center'>
        <MdMenu
          size={25}
          onClick={() => onViewChange("list")}
          className={`cursor-pointer ${view === "list" && "text-primary"}`}
        />
        <MdOutlineViewKanban
          size={23}
          onClick={() => onViewChange("grid")}
          className={`cursor-pointer ${view === "grid" && "text-primary"}`}
        />
      </div>
    </div>
  );
}

export default function Component(props: FiltersProps) {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ComponentContent {...props} />
    </Suspense>
  );
}
