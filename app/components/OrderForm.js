import styled from 'styled-components'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`
export default function OrderForm({ cart, fields, onChange, onPayment, isDisabled }) {
  return (
    <>
      {Object.keys(fields).map((field, index) => (
        <Input
          key={index}
          type='text'
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={fields[field]}
          onChange={(e) => onChange(field, e.target.value)}
        />
      ))}
      <Button $black $block $disabled={isDisabled} onClick={onPayment}>
        Continue to payment
      </Button>
    </>
  )
}