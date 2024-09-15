import {
  ContactType,
  PrismaClient,
  TicketStatus,
  TicketType,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

/* 
  Run with `npm run seed`
*/

const prisma = new PrismaClient();

async function createUser(
  email: string,
  name: string,
  password: string,
  role: "ADMIN" | "ATTENDANT"
) {
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
    },
  });
}
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function createTickets(
  adminUserId: string,
  attendantUserId: string,
  quantity: number = 30
) {
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
    "Manutenção Regular",
    "Problema de software",
    "Calibração de sensores",
    "Substituição de bateria",
    "Configuração de alertas",
    "Treinamento do usuário",
    "Integração com outros sistemas",
    "Diagnóstico de falhas",
    "Atualização de mapas",
    "Reparo de antena",
    "Otimização de rotas",
    "Configuração de geofence",
    "Análise de dados de telemetria",
    "Atualização de firmware",
    "Resolução de problemas de conectividade",
    "Personalização de relatórios",
    "Configuração de alertas de manutenção",
    "Otimização de consumo de combustível",
    "Instalação de acessórios",
    "Configuração de perfis de motorista",
    "Resolução de conflitos de software",
  ];
  const contactTypes: ContactType[] = ["EMAIL", "PHONE", "CHAT", "IN_PERSON"];
  const statuses: TicketStatus[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const types: TicketType[] = [
    "OPERATIONAL",
    "SUPPORT",
    "RELATIONSHIP",
    "SALES",
  ];
  const descriptions = [
    "Testes de instalação",
    "Veículo sem comunicação",
    "Melhorias no veículo",
    "Aparelho danificado",
    "Aparelho corrompido",
    "Nova instalação",
  ];

  const tickets = Array.from({ length: quantity }, async () => {
    const assignedToId = Math.random() > 0.5 ? adminUserId : attendantUserId;

    return prisma.ticket.create({
      data: {
        type: getRandomElement(types),
        reason: getRandomElement(reasons),
        description: getRandomElement(descriptions),
        customer: getRandomElement(customers),
        vehicle: getRandomElement(vehicles),
        passiveContact: Math.random() > 0.5,
        contactType: getRandomElement(contactTypes),
        status: getRandomElement(statuses),
        assignedTo: { connect: { id: assignedToId } },
        createdAt: new Date(
          new Date().setDate(
            new Date().getDate() - Math.floor(Math.random() * 7)
          )
        ),
        deadline: new Date(
          new Date().setDate(
            new Date().getDate() + Math.floor(Math.random() * 7) + 1
          )
        ),
      },
    });
  });

  return Promise.all(tickets);
}

async function main() {
  const adminUser = await createUser(
    "admin@comigo.com",
    "Admin",
    "admin",
    "ADMIN"
  );
  const attendantUser = await createUser(
    "atendente@comigo.com",
    "Atendente",
    "atendente",
    "ATTENDANT"
  );

  await createTickets(adminUser.id, attendantUser.id, 30);

  console.log("Seeding completed.");
}

main().finally(async () => {
  await prisma.$disconnect();
});
