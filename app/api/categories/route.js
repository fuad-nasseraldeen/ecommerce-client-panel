import { mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'

export async function GET(req) {
  await mongooseConnect()
  try {
    const categories = await Category.find()
    return new Response(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return new Response(JSON.stringify({ message: 'Error fetching categories' }), { status: 500 })
  }
}
