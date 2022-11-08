import { PrismaClient } from '@prisma/client';
import { order, products, user } from '../seeds';

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
  }

  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  });

  await prisma.order.upsert({
    where: { id: 'id' },
    update: {},
    create: order,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
