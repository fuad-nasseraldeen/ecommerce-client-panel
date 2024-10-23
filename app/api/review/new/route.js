import { Product } from '@/models/Product'

export async function POST(req) {
  try {
    const { productId, reviewerName, reviewerEmail, rating, comment } = await req.json()

    // Find the product by ID
    const product = await Product.findById(productId)
    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 })
    }

    // Create the new review object
    const newReview = {
      reviewerName,
      reviewerEmail,
      rating,
      comment,
      like: 0,
      dislike: 0,
      date: new Date(),
    }

    // Push the new review into the product's reviews array
    product.reviews.push(newReview)

    // Save the updated product to the database
    await product.save()

    // Return the updated product
    return new Response(JSON.stringify(newReview), { status: 201 })
  } catch (error) {
    console.error('Error adding new review:', error)
    return new Response(JSON.stringify({ error: 'Unable to add review' }), { status: 500 })
  }
}
