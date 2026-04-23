import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  padding: 0.85rem 0.95rem;
  margin-bottom: 0.3rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: #fff;
  color: var(--text-primary);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    outline: none;
    border-color: var(--brand);
    box-shadow: 0 0 0 4px rgba(15, 118, 110, 0.14);
  }
`

export default function Input(props) {
  return <StyledInput {...props} />
}
