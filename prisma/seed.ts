import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {


  const user = await prisma.user.upsert({
    where: { email: "admin@wesoline.com" },
    update: {},
    create: {
      email: "admin@wesoline.com",
      tcNo: "12345678901",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

