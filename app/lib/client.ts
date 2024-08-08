import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

// export const runtime = "edge";
const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });

let prisma: PrismaClient;

const connectionString = `${process.env.POSTGRES_PRISMA_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(neon);
// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient({ adapter });
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient({ adapter });
//     }
//     prisma = global.prisma;
// }

prisma = new PrismaClient({ adapter });
export default prisma;
