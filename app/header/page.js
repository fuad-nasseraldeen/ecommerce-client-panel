'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'
import Center from '@/app/components/Center'
import { useSelector } from 'react-redux'
import BarsIcon from '@/app/icons/Bars'
import { selectCartCount } from '@/app/redux/selectors'

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: ${(props) =>
    props.$isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'linear-gradient(180deg, #0f2438 0%, #10263a 100%)'};
  border-bottom: 1px solid ${(props) => (props.$isScrolled ? 'var(--border)' : 'rgba(255,255,255,0.08)')};
  box-shadow: ${(props) => (props.$isScrolled ? '0 8px 24px rgba(13, 20, 33, 0.12)' : 'none')};
  backdrop-filter: blur(8px);
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 78px;
`

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 46px;
    border-radius: 10px;
    box-shadow: ${(props) => (props.$isScrolled ? 'var(--shadow-sm)' : '0 10px 24px rgba(0, 0, 0, 0.25)')};
    transition: transform 0.18s ease;
  }

  &:hover img {
    transform: translateY(-1px);
  }
`

const StyledNav = styled.nav`
  ${(props) => (props.$mobileNavActive ? 'display: flex;' : 'display: none;')}
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  inset: 78px 0 auto 0;
  padding: 1rem;
  background: #ffffff;
  border-bottom: 1px solid var(--border);

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    inset: auto;
    background: transparent;
    border: 0;
    padding: 0;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }
`

const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => (props.$isScrolled ? 'var(--text-secondary)' : '#d2deed')};
  font-weight: 600;
  font-size: 0.96rem;
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${(props) => (props.$isScrolled ? 'var(--text-primary)' : '#fff')};
    background: ${(props) => (props.$isScrolled ? 'var(--surface-muted)' : 'rgba(255,255,255,0.1)')};
  }

  ${(props) =>
    props.$isActive &&
    css`
      color: ${props.$isScrolled ? 'var(--text-primary)' : '#fff'};
      background: ${props.$isScrolled ? 'var(--surface-muted)' : 'rgba(255,255,255,0.14)'};
    `}
`

const CartNavLink = styled(NavLink)``

const NavButton = styled.button`
  background: transparent;
  border: 0;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  color: ${(props) => (props.$isScrolled ? 'var(--text-primary)' : '#fff')};
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$isScrolled ? 'var(--surface-muted)' : 'rgba(255,255,255,0.12)')};
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export default function Header() {
  const pathname = usePathname()
  const cartItemsCount = useSelector(selectCartCount)
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileNavActive(false)
  }, [pathname])

  return (
    <StyledHeader $isScrolled={isScrolled}>
      <Center>
        <Wrapper>
          <Logo href='/' $isScrolled={isScrolled} aria-label='MegaStore Home'>
            <img src='/megaStore1.png' alt='MegaStore' />
          </Logo>

          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink href='/' $isScrolled={isScrolled} $isActive={pathname === '/'}>
              Home
            </NavLink>
            <NavLink href='/products' $isScrolled={isScrolled} $isActive={pathname === '/products'}>
              All Products
            </NavLink>
            <CartNavLink
              href='/cart'
              className='cart-icon'
              data-cart-target='true'
              $isScrolled={isScrolled}
              $isActive={pathname === '/cart'}
            >
              Cart ({cartItemsCount})
            </CartNavLink>
          </StyledNav>

          <NavButton
            type='button'
            $isScrolled={isScrolled}
            onClick={() => setMobileNavActive((prev) => !prev)}
            aria-label='Toggle navigation'
            aria-expanded={mobileNavActive}
          >
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}
