import Header from '@/app/header/page'
import Center from '@/app/components/Center'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import Title from '@/app/components/Title'
import ProductsClientPage from '@/app/components/ProductsClientPage'

export default async function ProductsServer() {
  // Server-side fetching of products
  await mongooseConnect()
  const products = await Product.find({}, null, { sort: { _id: -1 } })

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        {/* Pass products to a client-side component */}
        <ProductsClientPage products={JSON.parse(JSON.stringify(products))} />
      </Center>
    </>
  )
}
