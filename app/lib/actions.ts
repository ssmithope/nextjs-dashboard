'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ActionState = { message?: string };

function toCents(amount: string | number) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
}

export async function createInvoice(_: ActionState, formData: FormData): Promise<ActionState> {
  const customerId = String(formData.get('customerId') || '');
  const status = String(formData.get('status') || 'pending') as 'paid' | 'pending';
  const amount = toCents(formData.get('amount') as string);
  const date = String(formData.get('date') || new Date().toISOString().slice(0, 10));

  if (!customerId || amount <= 0) {
    return { message: 'Customer and positive amount are required.' };
  }

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${date})
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error(err);
    return { message: 'Failed to create invoice.' };
  }
}

export async function updateInvoice(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  const customerId = String(formData.get('customerId') || '');
  const status = String(formData.get('status') || 'pending') as 'paid' | 'pending';
  const amount = toCents(formData.get('amount') as string);
  const date = String(formData.get('date') || new Date().toISOString().slice(0, 10));

  if (!id) return { message: 'Invoice ID is required.' };
  if (!customerId || amount <= 0) {
    return { message: 'Customer and positive amount are required.' };
  }

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amount}, status = ${status}, date = ${date}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error(err);
    return { message: 'Failed to update invoice.' };
  }
}

export async function deleteInvoice(id: string): Promise<ActionState> {
  if (!id) return { message: 'Invoice ID is required.' };
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return {};
  } catch (err) {
    console.error(err);
    return { message: 'Failed to delete invoice.' };
  }
}
