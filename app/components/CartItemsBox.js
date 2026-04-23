import styled from 'styled-components'
import Button from '@/app/components/Button'
import Table from '@/app/components/Table'

const Box = styled.div`
  background-color: #fff;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 1rem;
`

const Heading = styled.h2`
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
`

const ProductInfoCell = styled.td`
  width: 50%;
  color: var(--text-primary);
`

const ProductMeta = styled.div`
  display: grid;
  gap: 0.2rem;
`

const ProductImageBox = styled.div`
  width: 64px;
  height: 64px;
  padding: 0.3rem;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 0.4rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const QuantityControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const QuantityLabel = styled.span`
  min-width: 1.8rem;
  text-align: center;
  font-weight: 600;
`

const TotalRow = styled.tr`
  td {
    font-weight: 700;
    color: var(--text-primary);
  }
`

const EmptyState = styled.div`
  color: var(--text-secondary);
  padding: 0.7rem 0;
`

export default function CartItemsBox({ cart, total, addProduct, removeProduct }) {
  return (
    <Box>
      <Heading>Cart</Heading>
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
            {cart.map((product) => (
              <tr key={product?._id}>
                <ProductInfoCell>
                  <ProductMeta>
                    <ProductImageBox>
                      <img src={product?.images?.[0]} alt={product?.title || 'Product'} />
                    </ProductImageBox>
                    <span>{product?.title}</span>
                  </ProductMeta>
                </ProductInfoCell>

                <td>
                  <QuantityControls>
                    <Button onClick={() => removeProduct(product)}>-</Button>
                    <QuantityLabel>{product?.quantity}</QuantityLabel>
                    <Button onClick={() => addProduct(product)}>+</Button>
                  </QuantityControls>
                </td>

                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}

            <TotalRow>
              <td></td>
              <td>Total</td>
              <td>${total}</td>
            </TotalRow>
          </tbody>
        </Table>
      ) : (
        <EmptyState>Your cart is empty.</EmptyState>
      )}
    </Box>
  )
}
