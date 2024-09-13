"use client"
import { useState } from 'react'
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi'

export default function Filters() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const renderDropdown = (label: string, options: string[]) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(label)}
        className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span>{label}</span>
        <FiChevronDown className="w-4 h-4 ml-2 text-gray-400" aria-hidden="true" />
      </button>
      
      {openDropdown === label && (
        <div className="absolute z-10 w-56 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        {renderDropdown('Período', ['Hoje', 'Esta semana', 'Este mês'])}
        {renderDropdown('Ordenado por', ['Data da abertura', 'Data de fechamento'])}
        {renderDropdown('Status', ['Em andamento', 'Concluído', 'Cancelado'])}
        {renderDropdown('Tipo', ['Tipo 1', 'Tipo 2', 'Tipo 3'])}
        {renderDropdown('Motivo', ['Motivo 1', 'Motivo 2', 'Motivo 3'])}
        {renderDropdown('Cliente', ['Cliente 1', 'Cliente 2', 'Cliente 3'])}
        {renderDropdown('Veículo', ['Veículo 1', 'Veículo 2', 'Veículo 3'])}
        
        <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <FiX className="w-4 h-4 mr-2 text-gray-400" />
          Remover filtros
        </button>
      </div>
    </div>
  )
}