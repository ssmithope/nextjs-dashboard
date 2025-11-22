import { fetchInvoices } from '@/app/lib/data';

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  return (
    <div>
      <h1 className="text-xl font-semibold">Invoices</h1>
      <a href="/dashboard/invoices/create" className="btn btn-primary mt-4">Create invoice</a>
      <table className="mt-6 w-full">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv: any) => (
            <tr key={inv.id}>
              <td>{inv.customer_id}</td>
              <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inv.amount / 100)}</td>
              <td>{inv.status}</td>
              <td>{new Date(inv.date).toLocaleDateString()}</td>
              <td>
                <a href={`/dashboard/invoices/${inv.id}/edit`} className="text-blue-600">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
