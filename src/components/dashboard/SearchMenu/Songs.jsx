import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`w-full rounded-xl p-2 grid grid-rows-3`}`
const Heading = styled.div`${tw`text-lg font-bold`}`
const SubHeading = styled.div`${tw`text-sm font-bold opacity-50`}`
const Image = styled.img`${tw`rounded-lg w-14 p-1`}`

const Songs = ({ data }) => {
  return (
    <Container className='col-span-2'>
      {data && data?.map((song, index) => (
        <div id={song?.id} className='flex gap-2 p-1'>
          <Image 
            src={song?.image[0]?.url || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'} 
            alt={song?.title + "'s Image"}
          />
          <div className='cols-span-2'>
            <Heading>{song?.title}</Heading>
            <SubHeading>{song?.singers}</SubHeading>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default Songs