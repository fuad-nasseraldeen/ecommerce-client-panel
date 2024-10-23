import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function GET(req) {
  await mongooseConnect()
  try {
    const products = await Product.find({}, null, { sort: { _id: -1 } })
    return new Response(JSON.stringify(products), { status: 200 })
  } catch (error) {
    console.error('Error fetching products:', error)
    return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 })
  }
}
