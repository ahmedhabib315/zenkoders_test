const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();

async function seed() {
  await prisma.packages.deleteMany();
  await prisma.packages.createMany({
    data: [
      {
        package_name: 'News Junk Basic Package',
        product_id: 'prod_P4bgfIhrGCvh6h',
        price_id: 'price_1OGST0IEDOzmC8ik16HBFlEy',
        amount: 10,
        duration: '1 month',
      },
      {
        package_name: 'News Junk Pro Package',
        product_id: 'prod_P4bdfuZUFtfScJ',
        price_id: 'price_1OGSQWIEDOzmC8ikMKEDgvmC',
        amount: 15,
        duration: '1 month',
      },
      {
        package_name: 'News Junk Enterprise Package',
        product_id: 'prod_P4bhZNU7ZNlSHU',
        price_id: 'price_1OGSU8IEDOzmC8ikajqSYoKB',
        amount: 30,
        duration: '1 month',
      },
    ],
  });
}

seed();
