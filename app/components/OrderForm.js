import styled from 'styled-components'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'

const FieldWrap = styled.div`
  margin-bottom: 0.68rem;
`

const ErrorField = styled.div`
  color: #b42318;
  font-size: 0.78rem;
  padding: 0.1rem 0.2rem 0;
`

export default function OrderForm({ fields, onChange, onPayment, isDisabled, errors }) {
  return (
    <>
      {Object.keys(fields).map((field) => (
        <FieldWrap key={field}>
          <Input
            type='text'
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={fields[field]}
            onChange={(e) => onChange(field, e.target.value)}
          />
          {errors[field] ? <ErrorField>{errors[field]}</ErrorField> : null}
        </FieldWrap>
      ))}

      <Button $black $block $disabled={isDisabled} onClick={onPayment}>
        Continue to payment
      </Button>
    </>
  )
}
