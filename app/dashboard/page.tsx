import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { supabase } from '@/lib/supabaseClient';

export default async function Page() {
  // Fetch revenue data
  const { data: revenue, error: revenueError } = await supabase
    .from('revenue')
    .select('*');
  if (revenueError) throw revenueError;

  // Fetch latest invoices with customer join
  const { data: invoicesData, error: invoicesError } = await supabase
    .from('invoices')
    .select(`
      id,
      amount,
      status,
      date,
      customers (
        name,
        email,
        image_url
      )
    `)
    .order('date', { ascending: false })
    .limit(5);
  if (invoicesError) throw invoicesError;

  // Map invoices into LatestInvoice shape
const latestInvoices =
  invoicesData?.map(inv => {
    const customer = inv.customers?.[0]; // Supabase returns array
    return {
      id: inv.id,
      amount: inv.amount,
      status: inv.status,
      date: inv.date,
      name: customer?.name ?? '',
      email: customer?.email ?? '',
      image_url: customer?.image_url ?? '',
    };
  }) ?? [];


  // Fetch customers count
  const { count: numberOfCustomers, error: customersError } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true });
  if (customersError) throw customersError;

  // Fetch invoices summary for totals
  const { data: invoicesSummary, error: summaryError } = await supabase
    .from('invoices')
    .select('status, amount');
  if (summaryError) throw summaryError;

  const totalPaidInvoices =
    invoicesSummary
      ?.filter(inv => inv.status === 'paid')
      .reduce((acc, inv) => acc + inv.amount, 0) ?? 0;

  const totalPendingInvoices =
    invoicesSummary
      ?.filter(inv => inv.status === 'pending')
      .reduce((acc, inv) => acc + inv.amount, 0) ?? 0;

  const numberOfInvoices = invoicesSummary?.length ?? 0;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers ?? 0}
          type="customers"
        />
      </div>

      {/* Charts and Latest Invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue ?? []} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
