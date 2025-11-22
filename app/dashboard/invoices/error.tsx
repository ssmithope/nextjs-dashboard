'use client';

import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Unable to load invoices</h2>
      <p className="text-gray-600">{error.message || 'Please try again.'}</p>
      <button className="px-3 py-2 border rounded" onClick={() => router.refresh()}>
        Retry
      </button>
    </div>
  );
}
