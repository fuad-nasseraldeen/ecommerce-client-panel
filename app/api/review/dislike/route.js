import { Product } from '@/models/Product'

export async function POST(req) {
  try {
    const { reviewId, productId } = await req.json()

    // Find the product by productId
    const product = await Product.findOne({ _id: productId })
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 })
    }

    // Update the dislike count for the specific review
    let updatedDislikeCount = 0
    const updatedReviews = product.reviews.map((review) => {
      if (review?._id.toString() === reviewId) {
        updatedDislikeCount = review.dislike + 1
        return { ...review, dislike: updatedDislikeCount }
      }
      return review
    })

    // Save the updated reviews back to the product
    product.reviews = updatedReviews
    await product.save()

    // Return the updated dislike count for the specific review
    return new Response(JSON.stringify({ dislike: updatedDislikeCount }), { status: 201 })
  } catch (error) {
    console.error('Error updating dislike:', error)
    return new Response(JSON.stringify({ error: 'Unable to update dislike' }), { status: 500 })
  }
}
