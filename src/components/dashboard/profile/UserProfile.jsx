import React, { lazy, useState } from 'react'
import userData from '../../../utils/userData'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GrClose } from "react-icons/gr"
import { useNavigate } from 'react-router-dom'
const Menu = lazy(() => import('./Menu'))

const Container = styled.div`${tw`absolute right-5 top-5 drop-shadow-xl`}`
const Image = styled.img`${tw`rounded-full w-11`}`

const UserProfile = () => {
  const [menu, showMenu] = useState(false)
  const userdata = userData()
  const navigate = useNavigate()

  function handleClick() { showMenu(!menu) }

  function handleLogout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    localStorage.removeItem('profilePic')
    localStorage.removeItem('languages')
    navigate('/')
  }

  return (
    <Container>
      <div onClick={handleClick}>
        {menu
          ? <GrClose className='absolute right-0 m-2' size={20} />
          : <Image src={userdata.profilePic} alt="userImg" />
        }
      </div>

      {menu &&
        <Menu userdata={userdata} handleLogout={handleLogout} />
      }
    </Container>
  )
}

export default UserProfile