import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`bg-[#181818] w-full rounded-xl p-5`}
transition: background 0.3s ease;
&:hover {
  background: #2a2a2a;
}`

const Heading = styled.div`${tw`text-2xl font-bold`}`
const SubHeading = styled.div`${tw`text-lg font-bold opacity-50`}`
const Image = styled.img`${tw`rounded-full w-28`}`

const TopResults = ({ data }) => {
  return (
    <Container id={data?.id}>
        <Image 
          src={data?.image[2]?.link || data?.image[1]?.link || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'} 
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