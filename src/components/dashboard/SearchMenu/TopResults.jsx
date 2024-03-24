import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`w-full rounded-xl p-5`}`
const Heading = styled.div`${tw`text-xl font-bold`}`
const SubHeading = styled.div`${tw`text-lg font-bold opacity-50`}`
const Image = styled.img`${tw`rounded-full w-28`}`

const TopResults = ({ data }) => {
  return (
    <Container id={data?.id}>
        <Image 
          src={data?.image[2]?.url || data?.image[1]?.url || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'} 
          alt={data?.title + "'s Image"}
        />
        <div className='mt-2 h-auto place-self-center'>
            <Heading>{data?.title}</Heading>
            <SubHeading>{data?.description}</SubHeading>
        </div>
    </Container>
  )
}

export default TopResults