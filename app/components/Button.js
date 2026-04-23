import { primary } from '@/lib/colors'
import styled, { css } from 'styled-components'

export const ButtonStyle = css`
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0.66rem 1rem;
  min-height: 42px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  transition: transform 0.16s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease;

  svg {
    height: 16px;
    width: 16px;
  }

  ${(props) =>
    props.$disabled &&
    css`
      background-color: #d3dbe6;
      color: #6a7585;
      cursor: not-allowed;
      opacity: 0.75;
      pointer-events: none;
      box-shadow: none;
      transform: none;
    `}

  ${(props) =>
    props.$white &&
    props.$outline &&
    css`
      background-color: transparent;
      color: #fff;
      border-color: rgba(255, 255, 255, 0.8);
    `}

  ${(props) =>
    props.$white &&
    !props.$outline &&
    css`
      background-color: #fff;
      color: #142231;
      border-color: #fff;
      box-shadow: var(--shadow-sm);
    `}

  ${(props) =>
    props.$black &&
    css`
      background-color: #1a2938;
      color: #fff;
      border-color: #1a2938;
    `}

  ${(props) =>
    props.$primary &&
    !props.$outline &&
    css`
      background: linear-gradient(135deg, ${primary}, #0b8f84);
      border-color: ${primary};
      color: #fff;
      box-shadow: 0 10px 24px rgba(15, 118, 110, 0.28);
    `}

  ${(props) =>
    props.$primary &&
    props.$outline &&
    css`
      background-color: transparent;
      border-color: ${primary};
      color: ${primary};
    `}

  ${(props) =>
    props.$block &&
    css`
      display: flex;
      width: 100%;
    `}

  ${(props) =>
    props.$size === 'l' &&
    css`
      font-size: 1.05rem;
      padding: 0.85rem 1.2rem;
      min-height: 48px;
    `}

  ${(props) =>
    props.$product &&
    css`
      min-width: 170px;
      padding: 0.75rem 1.25rem;
    `}

  ${(props) =>
    props.$widthTwentyPer &&
    css`
      width: 20%;
    `}

  ${(props) =>
    props.$checkout &&
    css`
      width: 100%;
      max-width: 260px;
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
      border-radius: 999px;
      background-color: #122131;
      border-color: #122131;
      color: #fff;
    `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: translateY(0);
  }
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>
}
