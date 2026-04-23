'use client'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    text-transform: uppercase;
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.72rem;
    letter-spacing: 0.07em;
    padding: 0.8rem 0.25rem;
  }
  td {
    border-top: 1px solid var(--border);
    padding: 0.8rem 0.25rem;
    color: var(--text-primary);
  }
`

export default function Table(props) {
  return <StyledTable {...props} />
}
