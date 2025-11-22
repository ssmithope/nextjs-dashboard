import { fetchCardData } from '@/app/lib/data';

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default async function CardWrapper() {
  const data = await fetchCardData();

  const items = [
    { label: 'Collected', value: formatCurrency(data.totalPaidInvoices) },
    { label: 'Pending', value: formatCurrency(data.totalPendingInvoices) },
    { label: 'Total invoices', value: String(data.numberOfInvoices) },
    { label: 'Customers', value: String(data.numberOfCustomers) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg border p-4 bg-white">
          <p className="text-sm text-gray-500">{it.label}</p>
          <p className="mt-2 text-2xl font-semibold">{it.value}</p>
        </div>
      ))}
    </div>
  );
}
