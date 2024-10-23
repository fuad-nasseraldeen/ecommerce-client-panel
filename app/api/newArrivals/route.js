import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function GET(req) {
  await mongooseConnect()
  try {
    const newArrivals = await Product.find({}, null, { limit: 10, skip: 15 })
    return new Response(JSON.stringify(newArrivals), { status: 200 })
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return new Response(JSON.stringify({ message: 'Error fetching new arrivals' }), { status: 500 })
  }
}
