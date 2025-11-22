'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page') ?? '1');

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  function go(page: number) {
    replace(createPageURL(page));
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => go(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${isCurrent ? 'bg-gray-200' : ''}`}
            aria-current={isCurrent ? 'page' : undefined}
            onClick={() => go(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        onClick={() => go(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </nav>
  );
}
