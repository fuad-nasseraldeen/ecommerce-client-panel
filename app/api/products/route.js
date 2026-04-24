import { getDbErrorMessage, getDbErrorStatus, mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req) {
  try {
    await mongooseConnect()
    const products = await Product.find({}, null, { sort: { _id: -1 } })
    return new Response(JSON.stringify(products), { status: 200 })
  } catch (error) {
    console.error('Error fetching products:', error)
    return new Response(JSON.stringify({ message: getDbErrorMessage(error) }), { status: getDbErrorStatus(error) })
  }
}
