import Cards from '@/app/ui/dashboard/cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-6`}>
        Dashboard
      </h1>

      {/* Summary cards */}
      <Cards />

      {/* Two-column layout for invoices and revenue */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <LatestInvoices />
        <RevenueChart />
      </div>
    </main>
  );
}
