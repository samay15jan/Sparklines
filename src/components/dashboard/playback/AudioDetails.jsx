import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Image = styled.img`${tw`w-16 rounded-lg p-1 ml-1 mr-1`}`
const Heading = styled.div`${tw`px-1 mt-3 opacity-80`}`
const SubHeading = styled.div`${tw`px-1 text-[12px] opacity-50`}`

const AudioDetails = ({ details }) => {
  return (
    <>{details
      ? <>
        <Image src={details?.image[0]?.link} alt='' />
        <div className='grid grid-rows-2'>
          <Heading>{details?.name}</Heading>
          <SubHeading>{details?.primaryArtists}</SubHeading>
        </div>
      </>
      : <>
        <div className='w-12 h-12 m-2 rounded-md animate-pulse bg-white opacity-20' />
        <div className='grid grid-rows-2 opacity-20'>
          <Heading className='w-40 h-4 rounded-md animate-pulse bg-white' />
          <SubHeading className='w-28 h-4 rounded-md animate-pulse bg-white' />
        </div>
      </>
    }
    </>
  )
}

export default AudioDetails