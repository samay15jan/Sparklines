import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Image = styled.img`${tw`w-16 rounded-sm p-2`}`
const Heading = styled.div`${tw`px-1 mt-3 opacity-80`}`
const SubHeading = styled.div`${tw`px-1 text-[12px] opacity-50`}`

const AudioDetails = ({ details }) => {
  return (
    <>
      <Image src={details.image[0].link} alt='' />
      <div className='grid grid-rows-2'>
        <Heading>{details.name}</Heading>
        <SubHeading>{details.primaryArtists}</SubHeading>
      </div>
    </>
  )
}

export default AudioDetails