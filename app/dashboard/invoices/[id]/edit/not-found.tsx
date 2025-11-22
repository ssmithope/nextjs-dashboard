import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Invoice not found</h1>
      <p className="text-gray-600">The invoice you’re looking for doesn’t exist.</p>
      <Link className="text-blue-600 hover:underline" href="/dashboard/invoices">Back to invoices</Link>
    </div>
  );
}
