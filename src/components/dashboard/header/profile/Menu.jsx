import React, { lazy, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { motion } from 'framer-motion'
const Profile = lazy(() => import('../../../authentication/Profile'))

const Heading = styled.div`
  ${tw`text-left px-2 my-1 rounded-md text-sm font-bold`}
  &:hover {
    background-color: #404040;
  }
`
const SubHeading = styled.div`
  ${tw`text-left py-1 rounded-md text-sm opacity-50`}
`
const Image = styled.img`
  ${tw`rounded-full w-20 mb-2 p-1`}
`

const Menu = ({ userdata, handleLogout }) => {
  const [menu, setMenu] = useState('default')
  return (
    <motion.div
      className='absolute mt-1 right-0 z-10 p-2 w-56 rounded-l-md rounded-b-md bg-[#282828]'
      initial={{ x: 100, }}
      animate={{ x: 13 }}
    >
      {menu === 'profile' && <Profile data={userdata} onNext={() => setMenu('default')} alreadyLoggedIn='true' />}
      {menu === 'default' &&
        <>
          <div className='w-full flex justify-center'>
            <Image className='hover:cursor-pointer hover:border-2' onClick={() => setMenu('profile')} src={userdata.profilePic} alt='userImg' />
          </div>
          <Heading>
            Username<SubHeading>{userdata.username}</SubHeading>
          </Heading>
          <Heading>
            Email<SubHeading>{userdata.email}</SubHeading>
          </Heading>
          <Heading>
            Languages<SubHeading>{userdata.languages}</SubHeading>
          </Heading>
          <Heading className='p-2 text-red-500 opacity-90' onClick={handleLogout}>
            Log out
          </Heading>
        </>
      }
    </motion.div>
  )
}

export default Menu
