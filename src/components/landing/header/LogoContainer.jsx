import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`w-32 p-2 rounded-full border-2 opacity-90 flex gap-2 font-bold justify-center`}`

const LogoContainer = ({ text, image, whiteBg, Icon }) => {
  return (
    <Container className={whiteBg && 'bg-black text-white border-black'}>
      {image &&
        <img src={image} className='w-5' />
      }
      {text}
      {Icon && <Icon size={25}/>}
    </Container>
  )
}

export default LogoContainer