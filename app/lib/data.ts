import { sql } from '@vercel/postgres';

type Customer = { id: string; name: string; email?: string };
type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
};
type CardData = {
  totalPaidInvoices: number;
  totalPendingInvoices: number;
  numberOfInvoices: number;
  numberOfCustomers: number;
};

// Customers
export async function fetchCustomers(): Promise<Customer[]> {
  try {
    const { rows } = await sql`SELECT id, name, email FROM customers ORDER BY name ASC`;
    return rows as Customer[];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

// Invoices
export async function fetchInvoices(): Promise<Invoice[]> {
  try {
    const { rows } = await sql`SELECT * FROM invoices`;
    return rows as Invoice[];
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

// Latest invoices
export async function fetchLatestInvoices(): Promise<Invoice[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM invoices
      ORDER BY date DESC
      LIMIT 5
    `;
    return rows as Invoice[];
  } catch (error) {
    console.error('Error fetching latest invoices:', error);
    return [];
  }
}

// Revenue
export async function fetchRevenue() {
  try {
    const { rows } = await sql`SELECT * FROM revenue`;
    return rows;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return [];
  }
}

// Dashboard Cards
export async function fetchCardData(): Promise<CardData> {
  try {
    const paid = await sql`SELECT SUM(amount) AS total FROM invoices WHERE status = 'paid'`;
    const pending = await sql`SELECT SUM(amount) AS total FROM invoices WHERE status = 'pending'`;
    const invoiceCount = await sql`SELECT COUNT(*) AS count FROM invoices`;
    const customerCount = await sql`SELECT COUNT(*) AS count FROM customers`;

    return {
      totalPaidInvoices: Number(paid.rows[0].total ?? 0),
      totalPendingInvoices: Number(pending.rows[0].total ?? 0),
      numberOfInvoices: Number(invoiceCount.rows[0].count ?? 0),
      numberOfCustomers: Number(customerCount.rows[0].count ?? 0),
    };
  } catch (error) {
    console.error('Error fetching card data:', error);
    return {
      totalPaidInvoices: 0,
      totalPendingInvoices: 0,
      numberOfInvoices: 0,
      numberOfCustomers: 0,
    };
  }
}

// Filtered invoices with search + pagination
export async function fetchFilteredInvoices(query: string, currentPage: number): Promise<Invoice[]> {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql`
      SELECT id, customer_id, amount, status, date
      FROM invoices
      WHERE status ILIKE ${'%' + query + '%'}
         OR customer_id::text ILIKE ${'%' + query + '%'}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as Invoice[];
  } catch (error) {
    console.error('Error fetching filtered invoices:', error);
    return [];
  }
}
