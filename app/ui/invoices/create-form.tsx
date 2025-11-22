"use client";

import { createInvoice } from '@/app/lib/actions';
import { useActionState } from 'react';

type Customer = { id: string; name: string };

const initialState = { message: null as string | null };

export default function CreateInvoiceForm({ customers }: { customers: Customer[] }) {
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="customerId" className="block text-sm font-medium">
          Customer
        </label>
        <select id="customerId" name="customerId" className="mt-1 block w-full" required>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount (USD)
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <select id="status" name="status" className="mt-1 block w-full">
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium">
          Date
        </label>
        <input id="date" name="date" type="date" className="mt-1 block w-full" />
      </div>

      <button type="submit" className="btn btn-primary">
        Create invoice
      </button>

      {state.message && (
        <p className="text-sm text-red-600" role="alert" aria-live="polite">
          {state.message}
        </p>
      )}
    </form>
  );
}
