import { createInvoice } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

type Customer = { id: string; name: string };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="mt-4 px-3 py-2 border rounded" aria-disabled={pending}>
      {pending ? 'Creating…' : 'Create'}
    </button>
  );
}

export default function CreateForm({ customers }: { customers: Customer[] }) {
  const [state, action] = useFormState(createInvoice, {});

  return (
    <form action={action} className="space-y-3" aria-describedby="form-status">
      <div>
        <label htmlFor="customerId" className="block text-sm">Customer</label>
        <select id="customerId" name="customerId" className="border rounded px-3 py-2 w-full" required>
          <option value="">Select a customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm">Amount (USD)</label>
        <input id="amount" name="amount" type="number" min="0" step="0.01" className="border rounded px-3 py-2 w-full" required />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm">Status</label>
        <select id="status" name="status" className="border rounded px-3 py-2 w-full">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm">Date</label>
        <input id="date" name="date" type="date" className="border rounded px-3 py-2 w-full" />
      </div>

      {state?.message && (
        <p id="form-status" role="alert" className="text-red-600 text-sm">{state.message}</p>
      )}

      <Submit />
    </form>
  );
}
