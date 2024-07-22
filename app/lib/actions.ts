"use server";

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
 
const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  last_visit: z.date(),
  contact_person: z.string(),
  email: z.string(),
  phone_number: z.string(),
  relation: z.enum(['Good', 'Middle', 'Bad']),
});
 
const CreateSchool = FormSchema.omit({ id: true, last_visit: true });
 
export async function createSchool(formData: FormData) {
  const { name, address, contact_person, email, phone_number, relation } = CreateSchool.parse({
    name: formData.get('name'),
    address: formData.get('address'),
    contact_person: formData.get('contact_person'),
    email: formData.get('email'),
    phone_number: formData.get('phone_number'),
    relation: formData.get('relation'),
  });

  await sql`
    INSERT INTO schools (name, address, contact_person, email, phone_number, relation)
    VALUES (${name}, ${address}, ${contact_person}, ${email}, ${phone_number}, ${relation})
  `;
  revalidatePath('/schools');
  redirect('/schools');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  "use server";
  await signOut();
}