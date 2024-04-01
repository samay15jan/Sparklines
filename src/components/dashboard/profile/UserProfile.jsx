import React, { useState } from 'react'
import userData from '../../../utils/userData'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GrClose } from "react-icons/gr"
import { useNavigate } from 'react-router-dom'

const Container = styled.div`${tw`absolute right-5 top-5 drop-shadow-xl`}`
const Image = styled.img`${tw`rounded-full`}`
const MenuContainer = styled.div`${tw`p-2 w-52 rounded-md grid grid-cols-1 bg-[#282828]`}`
const Heading = styled.div`${tw`text-left px-2 my-1 rounded-md text-sm font-bold`}
&:hover {
  background-color: #404040
}`
const SubHeading = styled.div`${tw`text-left cursor-pointer py-1 rounded-md text-sm opacity-50`}`

function Menu({ userdata, handleLogout }){  // TODO: integrate updating profile and languages
  return (
    <MenuContainer>
      <div className='w-full flex justify-center'>
        <Image className='w-20 mb-2 p-2' src={userdata.profilePic} alt="userImg" />
      </div>
      <Heading>Username<SubHeading>{userdata.username}</SubHeading></Heading>
      <Heading>Email<SubHeading>{userdata.email}</SubHeading></Heading>
      <Heading>Languages<SubHeading>{userdata.languages}</SubHeading></Heading>
      <Heading className='p-2 text-red-500 opacity-90' onClick={handleLogout}>Log out</Heading>
    </MenuContainer>
  )
}

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
          : <Image className='w-11' src={userdata.profilePic} alt="userImg" />
        }
      </div>

      {menu &&
        <Menu userdata={userdata} handleLogout={handleLogout} />
      }
    </Container>
  )
}

export default UserProfile