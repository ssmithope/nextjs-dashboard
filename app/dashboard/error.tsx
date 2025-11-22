'use client';

import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-gray-600">{error.message || 'An unexpected error occurred.'}</p>
      <button className="px-3 py-2 border rounded" onClick={() => router.refresh()}>
        Try again
      </button>
    </div>
  );
}
