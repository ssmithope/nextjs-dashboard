import { sql } from '@vercel/postgres';

// -------------------- Customers --------------------
export async function fetchCustomers() {
  try {
    const { rows } = await sql`SELECT * FROM customers`;
    return rows;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

// Optional alias if assignment mentions getCustomers
export async function getCustomers() {
  return fetchCustomers();
}

// -------------------- Invoices --------------------
export async function fetchInvoices() {
  try {
    const { rows } = await sql`SELECT * FROM invoices`;
    return rows;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

// Fetch only the latest 5 invoices
export async function fetchLatestInvoices() {
  try {
    const { rows } = await sql`
      SELECT * FROM invoices
      ORDER BY date DESC
      LIMIT 5
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching latest invoices:', error);
    return [];
  }
}

// -------------------- Revenue --------------------
export async function fetchRevenue() {
  try {
    const { rows } = await sql`SELECT * FROM revenue`;
    return rows;
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return [];
  }
}

// -------------------- Dashboard Cards --------------------
export async function fetchCardData() {
  try {
    const customers = await sql`SELECT COUNT(*) FROM customers`;
    const invoices = await sql`SELECT COUNT(*) FROM invoices`;
    const revenue = await sql`SELECT SUM(revenue) FROM revenue`;

    return {
      customers: customers.rows[0].count,
      invoices: invoices.rows[0].count,
      revenue: revenue.rows[0].sum,
    };
  } catch (error) {
    console.error('Error fetching card data:', error);
    return { customers: 0, invoices: 0, revenue: 0 };
  }
}
