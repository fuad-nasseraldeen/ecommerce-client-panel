import Featured from './featured/page'
import Header from './header/page'
import { Product } from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'
import NewProducts from './newProducts/NewProducts'
export default async function HomePage() {
  await mongooseConnect()
  const newProducts = await Product.find({}, null, { sort: { _id: -1 }, limit: 10 })

  const featuredProductId = '66a57c4af0850d95b66ac27a'
  const featuredProduct = await Product.findById(featuredProductId)
  return (
    <div>
      <Header />
      <Featured product={JSON.parse(JSON.stringify(featuredProduct))} />
      <NewProducts products={JSON.parse(JSON.stringify(newProducts))} />
    </div>
  )
}
