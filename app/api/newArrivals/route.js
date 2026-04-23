import { getDbErrorMessage, mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function GET(req) {
  try {
    await mongooseConnect()
    const newArrivals = await Product.find({}, null, { limit: 10, skip: 15 })
    return new Response(JSON.stringify(newArrivals), { status: 200 })
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return new Response(JSON.stringify({ message: getDbErrorMessage(error) }), { status: 500 })
  }
}
