import { fetchCustomers } from '@/app/lib/data';
import CreateInvoiceForm from '@/app/ui/invoices/create-form';

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();
  const customerOptions = customers.map((c: any) => ({ id: c.id, name: c.name }));

  return (
    <div>
      <h1 className="text-xl font-semibold">Create invoice</h1>
      <CreateInvoiceForm customers={customerOptions} />
    </div>
  );
}
