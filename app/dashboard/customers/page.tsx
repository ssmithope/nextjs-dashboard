import { fetchCustomers } from '@/app/lib/data';

type Customer = { id: string; name: string; email?: string };

export default async function CustomersPage() {
  const customers: Customer[] = await fetchCustomers();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-2 border">{customer.name}</td>
              <td className="px-4 py-2 border">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
