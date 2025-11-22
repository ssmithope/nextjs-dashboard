import { updateInvoice } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

type Customer = { id: string; name: string };
type Invoice = {
  id: string;
  amount: number;
  status: 'paid' | 'pending';
  date: string;
  customer_id: string;
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-4 px-3 py-2 border rounded" aria-disabled={pending}>
      {pending ? 'Updating…' : 'Update'}
    </button>
  );
}

export default function EditForm({ customers, invoice }: { customers: Customer[]; invoice: Invoice }) {
  const [state, action] = useFormState(updateInvoice.bind(null, invoice.id), {});

  return (
    <form action={action} className="space-y-3" aria-describedby="form-status">
      <div>
        <label htmlFor="customerId" className="block text-sm">Customer</label>
        <select id="customerId" name="customerId" className="border rounded px-3 py-2 w-full" defaultValue={invoice.customer_id} required>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm">Amount (USD)</label>
        <input id="amount" name="amount" type="number" min="0" step="0.01" className="border rounded px-3 py-2 w-full" defaultValue={(invoice.amount / 100).toFixed(2)} required />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm">Status</label>
        <select id="status" name="status" className="border rounded px-3 py-2 w-full" defaultValue={invoice.status}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm">Date</label>
        <input id="date" name="date" type="date" className="border rounded px-3 py-2 w-full" defaultValue={invoice.date} />
      </div>

      {state?.message && (
        <p id="form-status" role="alert" className="text-red-600 text-sm">{state.message}</p>
      )}

      <Submit />
    </form>
  );
}
