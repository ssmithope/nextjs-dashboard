import { notFound } from 'next/navigation';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import EditForm from '@/app/ui/invoices/edit-form';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `Edit invoice ${params.id}` };
}

export default async function Page({ params }: { params: { id: string } }) {
  const [customers, invoice] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(params.id),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Edit invoice</h1>
      <EditForm customers={customers} invoice={invoice!} />
    </div>
  );
}
