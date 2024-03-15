import React, { useState } from 'react'
import Auth from '../components/authentication/Auth'
import Video from '../components/authentication/Video'
import styled from 'styled-components'
import tw from 'twin.macro'
import ProfilePic from '../components/authentication/ProfilePic'

const Container = styled.div`${tw`flex justify-center`}`
const SubContainer = styled.div`${tw`w-2/3 min-h-screen items-center grid grid-cols-1 py-44 justify-center`}`

const Authentication = () => {
  const [userData, setUserData] = useState('')
  
  return (
    <div className='lg:grid lg:grid-cols-2 w-screen h-screen overflow-hidden'>
      <Container>
        <SubContainer>
          {userData == ''
           ? <ProfilePic />
           : <Auth data={(data) => setUserData(data)} />
          }
          
        </SubContainer>
      </Container>
      <Video />
    </div>
  )
}

export default Authentication