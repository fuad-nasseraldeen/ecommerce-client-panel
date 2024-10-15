import Center from '@/app/components/Center'
import ProductClientPage from '@/app/components/ProductClientPage'
import Header from '@/app/header/page'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function ProductPage({ params }) {
  await mongooseConnect()

  // Destructure the product `id` from the `params` object
  const { id } = params

  // Fetch product details using the `id`
  const product = await Product.findById(id)

  return (
    <>
      <Header />
      <Center>
        {/* Pass the product data to the client-side component */}
        <ProductClientPage product={JSON.parse(JSON.stringify(product))} />
      </Center>
    </>
  )
}
