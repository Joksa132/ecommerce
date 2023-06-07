const { PrismaClient } = require("@prisma/client");

const categories = [
  { name: "Laptops" },
  { name: "Phones" },
  { name: "Tablets" },
  { name: "Computers" },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const category of categories) {
      const existingCategory = await prisma.category.findUnique({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await prisma.category.create({
          data: category,
        });
        console.log(`Category "${category.name}" created.`);
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    await prisma.$disconnect();
  }
}

seed()