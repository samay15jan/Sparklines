import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const MenuContainer = styled.div`${tw`p-2 w-60 rounded-md grid grid-cols-1 bg-[#282828]`}`
const Heading = styled.div`${tw`text-left px-2 my-1 rounded-md text-sm font-bold`}
&:hover {
  background-color: #404040
}`
const SubHeading = styled.div`${tw`text-left cursor-pointer py-1 rounded-md text-sm opacity-50`}`
const Image = styled.img`${tw`rounded-full w-20 mb-2 p-2`}`

const Menu = ({ userdata, handleLogout }) => { // TODO: integrate theme switcher & updating profile and languages
  return (
    <MenuContainer>
      <div className='w-full flex justify-center'>
        <Image src={userdata.profilePic} alt="userImg" />
      </div>
      <Heading>Username<SubHeading>{userdata.username}</SubHeading></Heading>
      <Heading>Email<SubHeading>{userdata.email}</SubHeading></Heading>
      <Heading>Languages<SubHeading>{userdata.languages}</SubHeading></Heading>
      <Heading>Theme<SubHeading>Dark</SubHeading></Heading>
      <Heading className='p-2 text-red-500 opacity-90' onClick={handleLogout}>Log out</Heading>
    </MenuContainer>
  )
}

export default Menu