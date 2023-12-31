import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.card.deleteMany({});
    await prisma.credential.deleteMany({});
    await prisma.note.deleteMany({});
    await prisma.wifi.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.user.createMany({
      data: [
        {
          id: 1,
          email: "usuario1@example.com",
          password: "senha_teste",
        },
        {
          id: 2,
          email: "usuario2@example.com",
          password: "usuario_teste",
        },
      ],
    });

    await prisma.card.createMany({
      data: [
        {
          title: "Cartão 1",
          number: "1234 5678 9012 3456",
          name: "Nome do titular teste",
          cvv: "123",
          expirationDate: new Date("2024-12-31"),
          password: "senha1",
          isVirtual: false,
          type: "CREDIT",
          userId: 1,
        },
        {
          title: "Cartão 2",
          number: "5678 9012 3456 7890",
          name: "Nome do titular 2",
          cvv: "456",
          expirationDate: new Date("2025-06-30"),
          password: "senha2",
          isVirtual: true,
          type: "DEBT",
          userId: 2,
        },
      ],
    });

    await prisma.credential.createMany({
      data: [
        {
          url: "https://example.com",
          title: "Credencial 1",
          username: "usuario1",
          password: "senha1",
          userId: 1,
        },
        {
          url: "https://example.org",
          title: "Credencial 2",
          username: "usuario2",
          password: "senha2",
          userId: 2,
        },
      ],
    });

    await prisma.note.createMany({
      data: [
        {
          title: "Nota 1",
          text: "Texto da Nota 1",
          userId: 1,
        },
        {
          title: "Nota 2",
          text: "Texto da Nota 2",
          userId: 2,
        },
      ],
    });

    await prisma.wifi.createMany({
      data: [
        {
          title: "Wifi 1",
          network: "Minha Rede Wifi 1",
          password: "senha_wifi1",
          userId: 1,
        },
        {
          title: "Wifi 2",
          network: "Minha Rede Wifi 2",
          password: "senha_wifi2",
          userId: 2,
        },
      ],
    });

    console.log("Dados inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
