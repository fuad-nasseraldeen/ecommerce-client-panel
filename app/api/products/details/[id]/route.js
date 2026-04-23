import { getDbErrorMessage, mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req, { params }) {
  try {
    await mongooseConnect()
    const { id } = params
    const product = await Product.findById(id)

    if (!product) {
      return new Response(JSON.stringify({ message: 'Product not found' }), { status: 404 })
    }

    return new Response(JSON.stringify(product), { status: 200 })
  } catch (error) {
    console.error('Error fetching product:', error)
    return new Response(JSON.stringify({ message: getDbErrorMessage(error) }), { status: 500 })
  }
}
