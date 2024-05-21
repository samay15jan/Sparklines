import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.button`${tw`w-32 p-2 rounded-full border-2 opacity-90 flex gap-2 font-bold justify-center`}`

const LogoContainer = ({ text, image, whiteBg, Icon, navigation }) => {
  function handleNavigation () {
    if(text === 'Login') {
      navigation('/auth')
    }
  }

  return (
    <Container
      className={whiteBg && 'bg-black text-white border-black'}
      onClick={handleNavigation}
    >
      {image &&
        <img src={image} className='w-5' />
      }
      {text}
      {Icon && <Icon size={25} />}
    </Container>
  )
}

export default LogoContainer