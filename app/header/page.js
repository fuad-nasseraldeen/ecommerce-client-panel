'use client'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from '@/app/components/CartContext'
import Link from 'next/link'
import styled from 'styled-components'
import Center from '@/app/components/Center'
import Title from '@/app/components/Title'
import BarsIcon from '@/icons/Bars'
import { BlurOverlay } from '@/app/components/BlurOverlay'
import { LoadingIndicator } from '@/app/components/Spinner'
const StyledHeader = styled.header`
  background-color: #222;
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
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); /* Box shadow */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for hover and click */
  }

  &:hover img {
    transform: scale(1.05); /* Slight scale up on hover */
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.6); /* More pronounced shadow on hover */
  }

  &:active img {
    transform: scale(0.98); /* Slight scale down on click */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow change on click */
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`
const StyledNav = styled.nav`
  ${(props) => (props.$mobileNavActive ? `display: block; ` : `display: none;`)}
  gap: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 20px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 20px 20px 20px;
    font-size: 18px;
  }
`
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    color: #fff;
    transition: color 0.5s ease;
  }
`
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 13;
  @media screen and (min-width: 768px) {
    display: none;
  }
`

export default function Header() {
  const { cartProducts } = useContext(CartContext)
  const [mobileNavActive, setMobileNavActive] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    return () => {
      setTimeout(() => {
      setLoading(false)
    }, 2000)
    }
  }, [loading])

  if (loading)
    return (
      <>
        <BlurOverlay />
        <LoadingIndicator />
      </>
    )

  const backToHomePage = () => {
    setLoading(true)
  }

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          {/* <Title> */}
          {/* <Logo href={'/'}>MegaStore</Logo> */}
          <Logo href={'/'} onClick={backToHomePage}>
            <img src={'megaStore1.png'} alt='megaStore' />
          </Logo>
          {/* </Title> */}
          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            {/* <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink className='cart-icon' href={'/cart'}>
              Cart ({cartProducts.length})
            </NavLink>
          </StyledNav>
          <NavButton
            className='cart-icon'
            onClick={() => {
              setMobileNavActive((prev) => !prev)
              console.log(mobileNavActive)
            }}
          >
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}
