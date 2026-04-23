import { getDbErrorMessage, mongooseConnect } from '@/lib/mongoose'
import { Category } from '@/models/Category'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req) {
  try {
    await mongooseConnect()
    const categories = await Category.find()
    return new Response(JSON.stringify(categories), { status: 200 })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return new Response(JSON.stringify({ message: getDbErrorMessage(error) }), { status: 500 })
  }
}
