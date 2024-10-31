'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled, { css } from 'styled-components'
import Center from '@/app/components/Center'
import Loading from '@/app/components/Loading'
import { useSelector } from 'react-redux'
import BarsIcon from '@/app/icons/Bars'

const StyledHeader = styled.header`
  background-color: ${(props) => (props.$isScrolled ? 'rgba(170, 170, 170, 0.95)' : '#222')};

  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: ${(props) =>
    props.$isScrolled ? '0px 4px 12px rgba(0, 0, 0, 0.15)' : '0px 4px 8px rgba(255, 255, 255, 0.2)'};

  @media screen and (min-width: 768px) {
    box-shadow: none;
  }
`

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  display: flex;

  img {
    height: 60px;
    border-radius: 10px;
    box-shadow: ${(props) =>
      props.$isScrolled ? '0px 6px 12px rgba(0, 0, 0, 0.4)' : '0px 6px 12px rgba(255, 255, 255, 0.4)'};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
    box-shadow: ${(props) =>
      props.$isScrolled ? '0px 8px 16px rgba(0, 0, 0, 0.6)' : '0px 8px 16px rgba(255, 255, 255, 0.6)'};
  }

  &:active img {
    transform: scale(0.98);
    box-shadow: ${(props) =>
      props.$isScrolled ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : '0px 4px 8px rgba(255, 255, 255, 0.3)'};
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const StyledNav = styled.nav`
  ${(props) => (props.$mobileNavActive ? `display: block;` : `display: none;`)}
  ${(props) => (props.$isScrolled && !props.$mobileNavActive ? `background-color: #eee;` : 'background-color: #222;')}
  gap: 20px;
  position: fixed;
  background-color: #222;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    background-color: #222;
    position: static;
    top: 80;
    left: 10;
    background-color: transparent;
    padding: 20px;
    font-size: 18px;
  }
`

const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px 0;
  color: ${(props) => (props.$isScrolled ? '#222' : '#aaa')};
  font-weight: bold;
  &:hover {
    color: #fff;
    transition: color 0.5s ease;
  }
  ${(props) =>
    props.$mobileNavActive &&
    css`
      color: #aaa;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    `}
  ${(props) =>
    props.$isActive &&
    css`
      color: #fff;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    `}

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  color: #eee;
  cursor: pointer;
  position: relative;
  z-index: 13;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const cart = useSelector((state) => state.cart.items)
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
 const [loading, setLoading] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

    const handleNavigation = (href) => {
      setLoading(true)
      setTimeout(() => {
        router.push(href)
      }, 1000)
    }
  return (
<>
    <StyledHeader $isScrolled={isScrolled} $mobileNavActive={mobileNavActive}>
      <Center>
        <Wrapper>
          <Logo href={'/'} onClick={() => handleNavigation('/')} $isScrolled={isScrolled}>
            <img src={'megaStore1.png'} alt='megaStore' />
          </Logo>
          <StyledNav $mobileNavActive={mobileNavActive} $isScrolled={isScrolled}>
            <NavLink
              onClick={() => handleNavigation('/')}
              $isScrolled={isScrolled}
              $mobileNavActive={mobileNavActive}
              $isActive={pathname === '/'}
              href={'#'}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => handleNavigation('/products')}
              $isScrolled={isScrolled}
              $mobileNavActive={mobileNavActive}
              $isActive={pathname === '/products'}
              href={'#'}
            >
              All products
            </NavLink>
            <NavLink
              onClick={() => handleNavigation('/cart')}
              $isScrolled={isScrolled}
              $mobileNavActive={mobileNavActive}
              $isActive={pathname === '/cart'}
              href={'#'}
            >
              Cart ({cart?.reduce((acc, product) => acc + product.quantity, 0) || 0})
            </NavLink>
          </StyledNav>
          <NavButton $isScrolled={isScrolled} onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
    <Center>
      {loading && <Loading />}
      </Center>
      </>
  )
}
