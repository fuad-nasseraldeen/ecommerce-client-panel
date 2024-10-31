import styled from 'styled-components'
import Button from '@/app/components/Button'
import Table from '@/app/components/Table'

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`
const ProductInfoCell = styled.td`
  padding: 10px 0;
  width: 50%;
`
const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 0.5rem;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`
const QuantityLabel = styled.span`
  padding: 0px 24px;
  display: block;
  @media screen and (min-width: 768px) {
    // display: inline-block;
    // text-align: center;
  }
`
const Margin = styled.div`
  margin: 0.5rem;
`
export default function CartItemsBox({cart, total, addProduct, removeProduct}) {
  return (
    <Box>
      <h2>Cart</h2>
      {cart?.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((product, index) => (
              <tr key={product?._id + Math.random() * (100 - 1)}>
                <ProductInfoCell>
                  <ProductImageBox>
                    <img src={product?.images?.[0]} alt='' />
                  </ProductImageBox>
                  {product?.title}
                </ProductInfoCell>
                <td>
                  <Margin>
                    <Button onClick={() => removeProduct(product)}>-</Button>
                  </Margin>
                  <QuantityLabel>{product?.quantity}</QuantityLabel>
                  <Margin>
                    <Button onClick={() => addProduct(product)}>+</Button>
                  </Margin>
                </td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>${total}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <div>Your cart is empty</div>
      )}
    </Box>
  )
}