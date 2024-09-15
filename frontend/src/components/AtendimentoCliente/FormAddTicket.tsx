"use client";

import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketSchema, ticketSchema } from "@/schemas/ticketSchema";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BiCheck, BiPencil } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import {
  addBusinessDays,
  calculateBusinessDaysFromNow,
  formatDate,
  formatDateToInput,
} from "@/lib/utils";
import { FiSearch } from "react-icons/fi";

export default function TicketModal() {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDeadline, setEditDeadline] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketSchema>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      passiveContact: "true",
      contactType: undefined,
      deadline: formatDateToInput(addBusinessDays(new Date(), 3)),
    },
  });

  const onSubmit = (data: TicketSchema) => {
    console.log(data);
    // Handle form submission
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  const typeOptions = [
    { label: "Operacional", value: "OPERATIONAL" },
    { label: "Suporte", value: "SUPPORT" },
    { label: "Relacionamento", value: "RELATIONSHIP" },
    { label: "Vendas", value: "SALES" },
  ];

  const reasons = [
    { title: "Testes de Instalação", subtitle: "Verificar instalação" },
    { title: "Melhorias no veículo", subtitle: "Upgrade no sistema" },
    { title: "Nova Instalação", subtitle: "Adicionar novo aparelho" },
    { title: "Aparelho corrompido", subtitle: "Consertar aparelho" },
    { title: "Manutenção Regular", subtitle: "Verificação periódica" },
    { title: "Problema de software", subtitle: "Atualizar firmware" },
    { title: "Calibração de sensores", subtitle: "Ajustar precisão" },
    { title: "Substituição de bateria", subtitle: "Trocar bateria antiga" },
    { title: "Configuração de alertas", subtitle: "Personalizar notificações" },
    { title: "Treinamento do usuário", subtitle: "Instruções de uso" },
    {
      title: "Integração com outros sistemas",
      subtitle: "Conectar dispositivos",
    },
    { title: "Diagnóstico de falhas", subtitle: "Identificar problemas" },
    { title: "Atualização de mapas", subtitle: "Novos dados geográficos" },
    { title: "Reparo de antena", subtitle: "Melhorar recepção de sinal" },
    { title: "Otimização de rotas", subtitle: "Melhorar eficiência" },
    {
      title: "Configuração de geofence",
      subtitle: "Definir limites geográficos",
    },
    {
      title: "Análise de dados de telemetria",
      subtitle: "Interpretar informações do veículo",
    },
    {
      title: "Atualização de firmware",
      subtitle: "Melhorar desempenho do dispositivo",
    },
    {
      title: "Resolução de problemas de conectividade",
      subtitle: "Corrigir falhas de comunicação",
    },
    {
      title: "Personalização de relatórios",
      subtitle: "Ajustar formato de dados",
    },
    {
      title: "Configuração de alertas de manutenção",
      subtitle: "Programar lembretes de serviço",
    },
    {
      title: "Otimização de consumo de combustível",
      subtitle: "Melhorar eficiência energética",
    },
    {
      title: "Instalação de acessórios",
      subtitle: "Adicionar funcionalidades extras",
    },
    {
      title: "Configuração de perfis de motorista",
      subtitle: "Personalizar configurações por usuário",
    },
    {
      title: "Resolução de conflitos de software",
      subtitle: "Corrigir incompatibilidades",
    },
  ];

  const filteredReasons = reasons.filter(
    (reason) =>
      reason.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reason.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedReasons = filteredReasons.slice(0, 4);

  return (
    <div className="pb-8">
      <div className='p-6'>
        <p className='text-sm text-gray-600 mb-1'>Formulário de cadastro</p>
        <h2 className='text-xl font-semibold mb-4'>
          Novo atendimento ao cliente
        </h2>
        <div className='flex border-b'>
          <button
            className={`mr-4 py-2 ${
              step === 1
                ? "border-b-2 border-blue-500 text-primary font-semibold -mb-[2px]"
                : ""
            }`}
            onClick={() => setStep(1)}
          >
            CONTATO
          </button>
          <button
            className={`mr-4 py-2 ${
              step === 2
                ? "border-b-2 border-blue-500 text-primary font-semibold -mb-[2px]"
                : ""
            }`}
            onClick={() => setStep(2)}
          >
            TICKET
          </button>
          <button
            className={`mr-4 py-2 ${
              step === 3
                ? "border-b-2 border-blue-500 text-primary font-semibold -mb-[2px]"
                : ""
            }`}
            onClick={() => setStep(3)}
          >
            MOTIVO
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {step === 1 && (
          <div className='px-6'>
            <h3 className='text-lg font-semibold mb-2'>
              Digite o nome do cliente
            </h3>
            <input
              {...register("customer")}
              type='text'
              placeholder='Nome'
              className='w-full p-3 mb-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            <h3 className='text-lg font-semibold mb-2'>
              Houve contato passivo?
            </h3>
            <div className='flex mb-4 gap-4'>
                <label className={`p-4 w-full text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${watch("passiveContact") === "true" && "bg-blue-100 border-blue-400 text-blue-800"}`}>
                  <input
                    {...register("passiveContact")}
                    type='radio'
                    value='true'
                    className='mr-2'
                  />
                  Sim
                  <p className={`text-gray-400 font-normal ${watch("passiveContact") === "true" && "text-primary"}`}>O cliente entrou em contato</p>
                </label>
                <label className={`p-4 w-full text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${watch("passiveContact") === "false" && "bg-blue-100 border-blue-400 text-blue-800"}`}>
                  <input
                    {...register("passiveContact")}
                    type='radio'
                    value='false'
                    className='mr-2'
                  />
                  Não
                  <p className={`text-gray-400 font-normal ${watch("passiveContact") === "false" && "text-primary"}`}>Contato ainda será feito</p>
                </label>
            </div>

            {watch("passiveContact") !== "false" && (
              <div className='mb-4'>
                <label className='block mb-2'>Tipo de contato</label>
                <select
                  {...register("contactType")}
                  className='w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                  <option value=''>Selecione o tipo de contato</option>
                  <option value='PHONE'>Telefone</option>
                  <option value='EMAIL'>E-mail</option>
                  <option value='CHAT'>Chat</option>
                  <option value='IN_PERSON'>Pessoalmente</option>
                </select>
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <div className='px-6'>
            <h3 className='text-lg font-semibold '>
              Qual o intuito desse ticket?
            </h3>
            <p className='text-sm mb-4'>
              Explore as opções abaixo e selecione a mais adequada para o seu
              caso:
            </p>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              {typeOptions.map((option) => (
                <label key={option.value} className='flex items-center'>
                  <input
                    type='radio'
                    value={option.value}
                    {...register("type")}
                    className='mr-2'
                  />
                  {option.label}
                </label>
              ))}
            </div>
            <div className='mb-4'>
              <label className='block mb-2'>Veículo(s)</label>
              <select
                {...register("vehicle")}
                className='w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              >
                <option value=''>Selecione o veículo</option>
                <option value='Logan'>Logan</option>
                <option value='C4'>C4</option>
                <option value='Chevette'>Chevette</option>
                <option value='HB20'>HB20</option>
                <option value='Punto'>Punto</option>
                <option value='Onix'>Onix</option>
              </select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className='text-lg font-semibold px-6'>
              Qual o motivo desse ticket?
            </h3>
            <p className='text-sm mb-4 px-6'>
              Explique o motivo do seu atendimento
            </p>
            <div className='mb-4'>
              <div className='relative flex-grow px-6'>
                <input
                  type='text'
                  placeholder='Pesquisar'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full p-2 mb-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
                <FiSearch className='absolute right-10 top-2.5 h-5 w-5 text-gray-400' />
              </div>
              <div className='bg-blue-50 p-6 mt-2'>
                {displayedReasons.map((reason, index) => (
                  <label key={index} className='flex items-center mb-3'>
                    <input
                      type='radio'
                      value={reason.title}
                      {...register("reason")}
                      className='mr-2'
                    />
                    <div>
                      <strong>{reason.title}</strong>
                      <p className='text-sm'>{reason.subtitle}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className='mb-4 px-6'>
              <div className='flex gap-2'>
                <label className='block mb-2 font-semibold text-primary'>
                  Prazo estimado {formatDate(watch("deadline"))}
                </label>
                <ImInfo
                  title='O prazo é gerado considerando apenas dias úteis'
                  size={15}
                  className='mt-1 text-primary'
                />
                <BiPencil
                  title='Clique para editar o prazo'
                  size={15}
                  className='mt-1 text-primary cursor-pointer'
                  onClick={() => setEditDeadline(!editDeadline)}
                />
              </div>
              <p className="mb-2">
                Informe o cliente que a resolução desse motivo está prevista em{" "}
                {watch("deadline")
                  ? calculateBusinessDaysFromNow(
                      new Date(watch("deadline") as string)
                    )
                  : "N/A"}{" "}
                dias úteis
              </p>
              {editDeadline && (
                <input
                  type='date'
                  {...register("deadline")}
                  className='w-full p-3 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
              )}
            </div>
            <div className='mb-4 px-6'>
              <label className='block mb-2'>
                Informe mais detalhes sobre o ticket
              </label>
              <textarea
                {...register("description")}
                className='w-full p-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                rows={3}
              ></textarea>
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        )}
        <div className='flex justify-between px-6 pt-4'>
          {step > 1 ? (
            <Button
              type='button'
              variant='outline'
              onClick={() => setStep(Math.max(1, step - 1))}
              iconPosition='left'
              icon={<BsArrowLeft size={20} />}
            >
              Voltar
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button
              type='button'
              variant='filled'
              onClick={(e) => {
                e.preventDefault();
                setStep(Math.min(3, step + 1));
              }}
              iconPosition='right'
              icon={<BsArrowRight size={20} />}
            >
              Avançar
            </Button>
          ) : (
            <Button
              type='submit'
              variant='filled'
              iconPosition='right'
              icon={<BiCheck size={20} />}
            >
              Cadastrar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
