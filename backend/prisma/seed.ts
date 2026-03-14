import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/client';
import { Bcrypt } from 'src/auth/infra/bcrypt/auth.bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });
const bcrypt = new Bcrypt();
async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  const hashedPassword = await bcrypt.hashPassword(process.env.ADMIN_PASSWORD!);
  await prisma.user.create({
    data: {
      username: process.env.ADMIN_USERNAME!,
      password: hashedPassword,
    },
  });
  console.log('Seed was successful!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
