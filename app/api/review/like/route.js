import { Product } from '@/models/Product'

export async function POST(req) {
  try {
    const { reviewId, productId } = await req.json()

    // Find the product by productId
    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 })
    }

    // Update the like count for the specific review
    let updatedLikeCount = 0
    const updatedReviews = product.reviews.map((review) => {
      if (review?._id.toString() === reviewId) {
        updatedLikeCount = review.like + 1
        return { ...review, like: updatedLikeCount }
      }
      return review
    })

    // Save the updated reviews back to the product
    product.reviews = updatedReviews
    await product.save()

    // Return the updated like count for the specific review
    return new Response(JSON.stringify({ like: updatedLikeCount }), { status: 201 })
  } catch (error) {
    console.error('Error updating like:', error)
    return new Response(JSON.stringify({ error: 'Unable to update like' }), { status: 500 })
  }
}
