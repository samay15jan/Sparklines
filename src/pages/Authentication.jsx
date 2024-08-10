import React, { useState, lazy } from 'react'
import { useDocumentTitle } from '@uidotdev/usehooks'
import styled from 'styled-components'
import tw from 'twin.macro'
const AutoNavigate = lazy(() => import('../utils/AutoNavigate'))
const Auth = lazy(() => import('../components/authentication/Auth'))
const Profile = lazy(() => import('../components/authentication/Profile'))
const Languages = lazy(() => import('../components/authentication/firstLogin/Languages'))
const Video = lazy(() => import('../components/authentication/Video'))

const Container = styled.div`
  ${tw`flex justify-center`}
`
const SubContainer = styled.div`
  ${tw`w-2/3 min-h-screen items-center grid grid-cols-1 justify-center`}
`

const Authentication = () => {
  const [menu, setMenu] = useState('')
  const [userData, setUserData] = useState('')

  useDocumentTitle('Sparklines - Authentication')

  return (
    <div className='lg:grid lg:grid-cols-2 w-screen h-screen overflow-hidden bg-white text-black'>
      <AutoNavigate location='/dashboard' />
      <Container>
        <SubContainer>
          {menu != 'languages' ? (
            <>
              {' '}
              {userData != '' ? (
                <Profile data={userData} onNext={() => setMenu('languages')} />
              ) : (
                <Auth data={(data) => setUserData(data)} />
              )}
            </>
          ) : (
            <Languages />
          )}
        </SubContainer>
      </Container>
      <Video />
    </div>
  )
}

export default Authentication
