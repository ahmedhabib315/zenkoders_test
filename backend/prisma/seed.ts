const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();

async function seed() {
  await prisma.packages.deleteMany();
  await prisma.packages.createMany({
    data: [
      {
        package_name: 'Basic',
        product_id: 'prod_P4bgfIhrGCvh6h',
        package_desc: [
          'News Update every 1 hour',
          'Headlines update every 30 minutes',
          '100 calls Daily limit',
          'Help center access',
          'Email support'
        ],
        price_id: 'price_1OGST0IEDOzmC8ik16HBFlEy',
        amount: 10,
        duration: '1 month',
      },
      {
        package_name: 'Pro',
        product_id: 'prod_P4bdfuZUFtfScJ',
        package_desc: [
          'News Update every 15 minutes',
          'Headlines update every 10 minutes',
          '1000 calls Daily limit',
          'Help center access',
          'Priority email support'
        ],
        price_id: 'price_1OGSQWIEDOzmC8ikMKEDgvmC',
        amount: 15,
        duration: '1 month',
      },
      {
        package_name: 'Enterprise',
        product_id: 'prod_P4bhZNU7ZNlSHU',
        package_desc: [
          'News Update every 1 hour',
          'Headlines update every 30 minutes',
          '100 calls Daily limit',
          'Help center access',
          'Email support'
        ],
        price_id: 'price_1OGSU8IEDOzmC8ikajqSYoKB',
        amount: 30,
        duration: '1 month',
      },
    ],
  });
}

seed();
