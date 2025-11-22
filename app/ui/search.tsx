'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Search({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(searchParams.get('query')?.toString() ?? '');

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('query', value);
        params.set('page', '1');
      } else {
        params.delete('query');
        params.set('page', '1');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
    return () => clearTimeout(handler);
  }, [value, pathname, replace, searchParams]);

  return (
    <input
      aria-label="Search"
      className="border rounded px-3 py-2 w-64"
      placeholder={placeholder ?? 'Search'}
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
