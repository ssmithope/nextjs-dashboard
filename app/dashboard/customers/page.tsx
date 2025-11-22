// app/dashboard/customers/page.tsx
import { fetchCustomers } from '@/app/lib/data';

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} — {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
