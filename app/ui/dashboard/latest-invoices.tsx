import { fetchLatestInvoices, InvoiceWithCustomer } from '@/app/lib/data';

export default async function LatestInvoices() {
  const invoices: InvoiceWithCustomer[] = await fetchLatestInvoices();

  return (
    <div className="rounded-lg border p-4 bg-white">
      <h2 className="text-lg font-semibold">Latest invoices</h2>
      <ul className="mt-4 divide-y">
        {invoices.map((inv) => (
          <li key={inv.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{inv.customer_name}</p>
              <p className="text-sm text-gray-600">{inv.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">{inv.status}</p>
              <p className="font-semibold">${(inv.amount / 100).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
