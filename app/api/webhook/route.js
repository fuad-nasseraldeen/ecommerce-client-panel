import { NextResponse } from 'next/server'
import { mongooseConnect } from '@/lib/mongoose'
import { Order } from '@/models/Order'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK)
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET

export async function POST(req) {
  await mongooseConnect()

  const sig = req.headers.get('stripe-signature')
  let event

  try {
    const rawBody = await req.arrayBuffer()
    const reqBuffer = Buffer.from(rawBody)
    event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret)
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object
      const orderId = data.metadata.orderId
      const paid = data.payment_status === 'paid'

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }

      console.log('Payment successful for Order ID:', orderId)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
