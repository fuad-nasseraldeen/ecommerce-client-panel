import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function POST(req) {
  await mongooseConnect()
  const { ids } = await req.json() // Make sure to use req.json() to parse the body in a POST request

  try {
    const products = await Product.find({ _id: { $in: ids } }) // Use $in to match multiple IDs
    return new Response(JSON.stringify(products), { status: 201 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return new Response(JSON.stringify({ message: 'Error fetching product' }), { status: 500 })
  }
}
