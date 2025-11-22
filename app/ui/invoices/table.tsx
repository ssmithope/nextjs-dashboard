import { fetchFilteredInvoices } from '@/app/lib/data';
import Link from 'next/link';
import { DeleteButton, EditButton } from '@/app/ui/invoices/buttons';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Customer</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-t">
              <td className="px-4 py-2">{inv.date}</td>
              <td className="px-4 py-2">
                <Link href={`/dashboard/invoices/${inv.id}/edit`} className="text-blue-600 hover:underline">
                  {inv.customer_id}
                </Link>
              </td>
              <td className="px-4 py-2">${(inv.amount / 100).toFixed(2)}</td>
              <td className="px-4 py-2">{inv.status}</td>
              <td className="px-4 py-2 text-right">
                <div className="inline-flex gap-2">
                  <EditButton id={inv.id} />
                  <DeleteButton id={inv.id} />
                </div>
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
