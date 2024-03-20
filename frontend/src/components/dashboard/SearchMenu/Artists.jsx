import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`flex  w-full rounded-xl p-5`}`
const Heading = styled.div`${tw`text-lg font-bold max-w-52`}`
const SubHeading = styled.div`${tw`text-sm font-bold opacity-50 max-w-52`}`
const Image = styled.img`${tw`rounded-full w-52`}`

const Artists = ({ data }) => {
  return (
    <Container>
      {data && data?.map((artist, index) => (
        <div id={artist?.id} className='w-1/2 p-2'>
          <Image
            src={artist?.image[2]?.url || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'}
            alt={artist?.title + "'s Image"}
          />
          <div className='grid grid-cols-1'>
            <Heading>{artist?.title}</Heading>
            <SubHeading>{artist?.description}</SubHeading>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default Artists