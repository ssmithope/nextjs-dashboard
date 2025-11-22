'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { deleteInvoice } from '@/app/lib/actions';

export function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="px-2 py-1 border rounded text-sm"
    >
      <span className="sr-only">Edit invoice</span>
      Edit
    </Link>
  );
}

export function DeleteButton({ id }: { id: string }) {
  const [pending, start] = useTransition();

  return (
    <button
      className="px-2 py-1 border rounded text-sm"
      aria-disabled={pending}
      onClick={() => start(async () => { await deleteInvoice(id); })}
    >
      <span className="sr-only">Delete invoice</span>
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}
