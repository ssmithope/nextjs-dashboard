import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be set in .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  try {
    // Generate 10 customers with UUIDs
    const customers = [
      { id: randomUUID(), name: 'Alice Johnson', email: 'alice@example.com' },
      { id: randomUUID(), name: 'Bob Smith', email: 'bob@example.com' },
      { id: randomUUID(), name: 'Charlie Brown', email: 'charlie@example.com' },
      { id: randomUUID(), name: 'Diana Prince', email: 'diana@example.com' },
      { id: randomUUID(), name: 'Ethan Hunt', email: 'ethan@example.com' },
      { id: randomUUID(), name: 'Fiona Gallagher', email: 'fiona@example.com' },
      { id: randomUUID(), name: 'George Lucas', email: 'george@example.com' },
      { id: randomUUID(), name: 'Hannah Montana', email: 'hannah@example.com' },
      { id: randomUUID(), name: 'Ian McKellen', email: 'ian@example.com' },
      { id: randomUUID(), name: 'Julia Roberts', email: 'julia@example.com' },
    ];

    const { error: customerError } = await supabase.from('customers').insert(customers);
    if (customerError) throw customerError;

    // Create invoices linked to those customers
    const invoices = [
      { id: randomUUID(), customer_id: customers[0].id, amount: 5000, status: 'paid', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[1].id, amount: 7500, status: 'pending', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[2].id, amount: 12000, status: 'paid', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[3].id, amount: 3000, status: 'pending', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[4].id, amount: 9500, status: 'paid', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[5].id, amount: 4200, status: 'pending', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[6].id, amount: 8800, status: 'paid', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[7].id, amount: 6100, status: 'pending', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[8].id, amount: 7300, status: 'paid', date: new Date().toISOString() },
      { id: randomUUID(), customer_id: customers[9].id, amount: 2500, status: 'pending', date: new Date().toISOString() },
    ];

    const { error: invoiceError } = await supabase.from('invoices').insert(invoices);
    if (invoiceError) throw invoiceError;

    console.log('Database seeded successfully with 10 customers and 10 invoices');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
