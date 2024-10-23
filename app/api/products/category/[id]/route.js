// /api/products/category/[id]/route.js
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export async function GET(req, { params }) {
  await mongooseConnect()
  const { id } = params

  console.log('ID:', id) // Check if the ID is being logged

  try {
    const products = await Product.find({ category: id })

    if (!products.length) {
      return new Response(JSON.stringify({ message: 'No products found for this category' }), { status: 404 })
    }

    return new Response(JSON.stringify(products), { status: 200 })
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 })
  }
}
