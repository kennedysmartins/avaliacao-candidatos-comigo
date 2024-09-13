// src/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

/* 
  Run with `npm run seed`
*/

const prisma = new PrismaClient();

async function main() {

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@comigo.com' },
    update: {},
    create: {
      id: 'e79b83be-e1f2-4e53-9b5a-d9e32bc089f8',
      name: 'Admin',
      email: 'admin@comigo.com',
      password: await bcrypt.hash('admin', 10),
      role: 'ADMIN',
    },
  });

  const attendantUser = await prisma.user.upsert({
    where: { email: 'atendente@comigo.com' },
    update: {},
    create: {
      id: 'd231ad93-d83e-4d10-bf92-bbb3bb1cd8bc',
      name: 'Atendente',
      email: 'atendente@comigo.com',
      password: await bcrypt.hash('atendente', 10),
      role: 'ATTENDANT',
    },
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      type: 'SUPPORT',
      reason: 'Problema com login',
      description: 'Usuário não consegue acessar o sistema.',
      customer: 'João da Silva',
      vehicle: 'Gol',
      passiveContact: false,
      contactType: 'EMAIL',
      status: 'OPEN',
      assignedTo: {
        connect: { id: attendantUser.id },
      },
      deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      type: 'SALES',
      reason: 'Dúvida sobre plano de vendas',
      description: 'Cliente quer saber mais sobre o plano premium.',
      customer: 'Maria Souza',
      vehicle: 'Logan',
      passiveContact: true,
      contactType: 'PHONE',
      status: 'IN_PROGRESS',
      assignedTo: {
        connect: { id: adminUser.id },
      },
      deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
  });

  console.log({ adminUser, attendantUser, ticket1, ticket2 });
  console.log('Seeding completed.');
}

main().finally(async () => {
  await prisma.$disconnect();
});