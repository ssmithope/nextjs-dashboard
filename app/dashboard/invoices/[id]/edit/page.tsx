import { sql } from '@vercel/postgres';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';

type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
};

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { rows } = await sql`
    SELECT id, customer_id, amount, status, date
    FROM invoices
    WHERE id = ${id}
    LIMIT 1
  `;

  const row = rows[0];
  if (!row) return <p>Invoice not found.</p>;

  const invoice: Invoice = {
    id: row.id,
    customer_id: row.customer_id,
    amount: Number(row.amount),
    status: row.status as 'paid' | 'pending',
    date: row.date,
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Edit invoice</h1>
      <EditInvoiceForm invoice={invoice} customers={[]} />
    </div>
  );
}
