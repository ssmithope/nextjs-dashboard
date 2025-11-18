import bcrypt from 'bcrypt'
import { supabase } from '@/lib/supabaseClient'
import { users, customers, invoices, revenue } from '../lib/placeholder-data'

// Define types that match your Supabase schema
type User = {
  id: string
  name: string
  email: string
  password: string
}

type Customer = {
  id: string
  name: string
  email: string
  image_url: string
}

type Invoice = {
  id: string                // <-- added id here
  customer_id: string
  amount: number
  status: string
  date: string
}

type Revenue = {
  month: string
  revenue: number
}

async function seedUsers() {
  for (const user of users as User[]) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      })

    if (error) throw error
  }
}

async function seedCustomers() {
  for (const customer of customers as Customer[]) {
    const { error } = await supabase
      .from('customers')
      .upsert({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
      })

    if (error) throw error
  }
}

async function seedInvoices() {
  for (const invoice of invoices as Invoice[]) {
    const { error } = await supabase
      .from('invoices')
      .upsert({
        id: invoice.id,              // now valid
        customer_id: invoice.customer_id,
        amount: invoice.amount,
        status: invoice.status,
        date: invoice.date,
      })

    if (error) throw error
  }
}

async function seedRevenue() {
  for (const rev of revenue as Revenue[]) {
    const { error } = await supabase
      .from('revenue')
      .upsert({
        month: rev.month,
        revenue: rev.revenue,
      })

    if (error) throw error
  }
}

export async function GET() {
  try {
    await seedUsers()
    await seedCustomers()
    await seedInvoices()
    await seedRevenue()

    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}
