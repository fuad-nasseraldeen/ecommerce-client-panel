import styled from 'styled-components'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`
const ErrorField = styled.div`
  color: red;
  font-size: 11px;
  padding: 0px 0px 10px 5px;
  `
export default function OrderForm({ cart, fields, onChange, onPayment, isDisabled, errors }) {
  return (
    <>
      {Object.keys(fields).map((field, index) => (
        <div key={index}>
          <Input
            key={index}
            type='text'
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={fields[field]}
            onChange={(e) => onChange(field, e.target.value)}
          />
          {errors[field] !== '' ? <ErrorField>{errors[field]}</ErrorField> : ''}
        </div>
      ))}
      <Button $black $block $disabled={isDisabled} onClick={onPayment}>
        Continue to payment
      </Button>
    </>
  )
}