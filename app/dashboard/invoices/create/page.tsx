import { fetchCustomers } from '@/app/lib/data';
import CreateForm from '@/app/ui/invoices/create-form';

export const metadata = {
  title: 'Create invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold mb-4">Create invoice</h1>
      <CreateForm customers={customers} />
    </div>
  );
}
