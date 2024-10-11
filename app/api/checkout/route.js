import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import { Order } from '@/models/Order'
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SK)

export async function POST(req) {
  try {
    const { name, email, city, postalCode, streetAddress, country, cartProducts } = await req.json()

    await mongooseConnect()
    const productsIds = cartProducts
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos = await Product.find({ _id: uniqueIds })

    let line_items = []

    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find((p) => p._id.toString() === productId)
      const quantity = productsIds.filter((id) => id === productId)?.length || 0
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: 'USD',
            product_data: { name: productInfo.title },
            unit_amount: productInfo.price * 100, // Amount in cents
          },
        })
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: { orderId: orderDoc._id.toString() },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating Stripe session:', error)
    return NextResponse.json({ message: 'Error creating Stripe session' }, { status: 500 })
  }
}
