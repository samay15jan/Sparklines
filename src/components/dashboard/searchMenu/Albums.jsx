import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`flex  w-full rounded-xl p-5`}`
const Heading = styled.div`${tw`text-lg font-bold max-w-52`}`
const SubHeading = styled.div`${tw`text-sm font-bold opacity-50 max-w-52`}`
const Image = styled.img`${tw`rounded-xl w-52`}`

const Albums = ({ data }) => {
  return (
    <Container>
      {data && data?.map((album, index) => (
        <div id={album?.id} className='w-1/2 p-2'>
          <Image
            src={album?.image[2]?.link || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'}
            alt={album?.title + "'s Image"}
          />
          <div className='grid grid-cols-1'>
            <Heading>{album?.title}</Heading>
            <SubHeading>{album?.description}</SubHeading>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default Albums