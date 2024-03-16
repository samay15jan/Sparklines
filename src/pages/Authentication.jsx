import React, { useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const ProfilePic = lazy(() => import('../components/authentication/ProfilePic'))
const Auth = lazy(() => import('../components/authentication/Auth'))
const Video = lazy(() => import('../components/authentication/Video'))

const Container = styled.div`${tw`flex justify-center`}`
const SubContainer = styled.div`${tw`w-2/3 min-h-screen items-center grid grid-cols-1 py-44 justify-center`}`

const Authentication = () => {
  const [userData, setUserData] = useState('')

  return (
    <div className='lg:grid lg:grid-cols-2 w-screen h-screen overflow-hidden'>
      <AutoNavigate location='/dashboard' />
      <Container>
        <SubContainer>
          {userData != ''
            ? <ProfilePic data={userData} />
            : <Auth data={(data) => setUserData(data)} />
          }
        </SubContainer>
      </Container>
      <Video />
    </div>
  )
}

export default Authentication