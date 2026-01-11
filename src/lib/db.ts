import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'; // required now in v7
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
}
// required for prisma v7  https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// NOTE: this is required as in some instances prisma makes a new prisma client acn leet to major Warning in my terminal 
if (process.env.NODE_ENV != "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;


