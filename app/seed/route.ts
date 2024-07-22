import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users, schools } from '../lib/placeholder-data';

const client = await db.connect();


async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, first_name, last_name, email, password)
        VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedSchools() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await client.sql`CREATE TYPE IF NOT EXISTS relation_type AS ENUM ('Good', 'Middle', 'Bad')`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS schools (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      last_visit VARCHAR(255),
      contact_person VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone_number VARCHAR(255) NOT NULL,
      relation VARCHAR(255) NOT NULL
    );
  `;
  console.log("Schools table created.");

  const insertedSchools = await Promise.all(
    schools.map(async (school) => {
      return client.sql`
        INSERT INTO schools (id, name, address, last_visit, contact_person, email, phone_number, relation)
        VALUES (${school.id}, ${school.name}, ${school.address}, ${school.last_visit}, ${school.contact_person}, ${school.email}, ${school.phone_number}, ${school.relation})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedSchools;
}


async function seedCorrespondants() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS correspondants (
      school_id UUID NOT NULL,
      user_id UUID NOT NULL,
      PRIMARY KEY (school_id, user_id),
      FOREIGN KEY (school_id) REFERENCES schools (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
  `;
}

async function seedEmails() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS emails (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
    );
  `;
}

// async function seedInvoices() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       customer_id UUID NOT NULL,
//       amount INT NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       date DATE NOT NULL
//     );
//   `;

//   const insertedInvoices = await Promise.all(
//     invoices.map(
//       (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedInvoices;
// }

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {

  try {
    await client.sql`BEGIN`;
    await seedSchools();
    await seedUsers();
    // await seedCorrespondants()
    // await seedCustomers();
    // await seedInvoices();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
