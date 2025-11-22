import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  return (
    <div className="rounded-lg border p-4 bg-white">
      <h2 className="text-lg font-semibold">Revenue</h2>
      <div className="mt-4">
        {/* Simple bar chart substitute */}
        <div className="space-y-2">
          {revenue.map((r) => (
            <div key={r.month} className="flex items-center gap-4">
              <span className="w-16 text-sm text-gray-600">{r.month}</span>
              <div className="h-4 bg-blue-500 rounded" style={{ width: `${Math.min(r.revenue / 1000, 100)}%` }} />
              <span className="text-sm text-gray-600">${(r.revenue / 100).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
