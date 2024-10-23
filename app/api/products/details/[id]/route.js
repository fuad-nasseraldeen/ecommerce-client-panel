import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function GET(req, { params }) {
  await mongooseConnect()
  const { id } = params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return new Response(JSON.stringify({ message: 'Error fetching product' }), { status: 500 })
  }
}
