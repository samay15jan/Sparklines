import React, { lazy, useState } from 'react'
import userData from '../../../../utils/userData'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
const Menu = lazy(() => import('./Menu'))

const Container = styled.div`
  ${tw`mt-[1px]`}
`
const Image = styled.img`
  ${tw`p-1 bg-black rounded-full w-8`}
`

const UserProfile = () => {
  const [menu, showMenu] = useState(false)
  const userdata = userData()
  const navigate = useNavigate()

  function handleClick() {
    showMenu(!menu)
  }

  function handleLogout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    localStorage.removeItem('profilePic')
    localStorage.removeItem('languages')
    navigate('/')
  }

  return (
    <AnimatePresence>
      <Container>
        <div onClick={handleClick}>
          {menu ? (
            <GrClose
              className='right-0 m-1 mt-1 opacity-80 p-[1px]'
              size={20}
            />
          ) : (
            <Image src={userdata.profilePic} alt='userImg' />
          )}
        </div>

        <div className='relative w-auto'>
          {menu && <Menu userdata={userdata} handleLogout={handleLogout} />}
        </div>
      </Container>
    </AnimatePresence>
  )
}

export default UserProfile
