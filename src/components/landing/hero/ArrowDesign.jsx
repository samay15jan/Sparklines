import React from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'

const Container = styled.div`${tw`mb-5 ml-2 flex gap-4`}`
const Rectange = styled.div`${tw`w-80 h-6 mt-2 bg-gradient-to-r from-red-400 via-pink-500 to-indigo-400`}`
const Triangle = styled.div`${tw`w-10`}
width: 0;
height: 0;
border-top: 20px solid transparent;
border-left: 30px solid #CAFC00;
border-bottom: 20px solid transparent;
`
const ArrowDesign = () => {
  return (
    <Container>
      <Rectange />
      <Triangle />
    </Container>
  )
}

export default ArrowDesign