import { primary } from '@/lib/colors'
import styled, { css } from 'styled-components'

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #transparent;
      color: #000;
      border: 1px solid #000;
    `}
      ${(props) =>
    props.$black &&
    props.$outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.$black &&
    !props.$outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background-color: ${primary};
      border: 1px solid: ${primary};
      color: #fff;
    `}
  ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      border: 2px solid ${primary};
      color: ${primary};
    `}
    ${(props) =>
    props.$primary &&
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.$size === 'l' &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
    ${(props) =>
    props.$product &&
    css`
      padding: 10px 50px;
    `}
  &:hover {
    transform: scale(0.95);
    transition: transform 0.3s ease;
  }
`
const StyledButton = styled.button`
  ${ButtonStyle}
`

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>
}
