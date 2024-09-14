// src/prisma/seed.ts
import { ContactType, PrismaClient, TicketStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

/* 
  Run with `npm run seed`
*/

const prisma = new PrismaClient();

async function createUser(email: string, name: string, password: string, role: "ADMIN" | "ATTENDANT") {
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

function getRandomReason() {
  const reasons = ["Incidente", "Upgrade", "Teste", "Furto", "Danificado", "Instalação"];
  return getRandomElement(reasons);
}

function getRandomDescription() {
  const descriptions = [
    "Testes de instalação",
    "Veículo sem comunicação",
    "Melhorias no veículo",
    "Aparelho danificado",
    "Aparelho corrompido",
    "Nova instalação",
  ];
  return getRandomElement(descriptions);
}

async function createTickets(adminUserId: string, attendantUserId: string, quantity: number = 30) {
  const customers = ["Kennedy", "Renata", "Rafael", "Vitória", "Lucas", "Amanda", "Joyce", "Deriki", "Rodrigo", "Camila"];
  const vehicles = ["Logan", "Punto", "Gol", "Fusca", "C4", "Hb20", "Onix", "Chevette"];
  const contactTypes: ContactType[] = ["EMAIL", "PHONE", "CHAT", "IN_PERSON"];
  const statuses: TicketStatus[] = ["OPEN", "IN_PROGRESS", "CLOSED"];

  const tickets = Array.from({ length: quantity }, async () => {
    const assignedToId = Math.random() > 0.5 ? adminUserId : attendantUserId;

    return prisma.ticket.create({
      data: {
        type: Math.random() > 0.5 ? "SUPPORT" : "SALES",
        reason: getRandomReason(),
        description: getRandomDescription(),
        customer: getRandomElement(customers),
        vehicle: getRandomElement(vehicles),
        passiveContact: Math.random() > 0.5,
        contactType: getRandomElement(contactTypes),
        status: getRandomElement(statuses),
        assignedTo: { connect: { id: assignedToId } },
        createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 7))),
        deadline: new Date(new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 7) + 1)),
      },
    });
  });

  return Promise.all(tickets);
}

async function main() {
  const adminUser = await createUser("admin@comigo.com", "Admin", "admin", "ADMIN");
  const attendantUser = await createUser("atendente@comigo.com", "Atendente", "atendente", "ATTENDANT");

  await createTickets(adminUser.id, attendantUser.id, 30);

  console.log("Seeding completed.");
}

main().finally(async () => {
  await prisma.$disconnect();
});
