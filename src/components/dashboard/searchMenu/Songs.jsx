import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`w-full h-auto py-3 rounded-xl p-2 grid grid-rows-3`}`
const SubContainer = styled.div`${tw`flex gap-2 p-1 w-full rounded-lg`}
transition: background 0.3s ease;
&:hover {
  background: #2a2a2a;
}`

const Heading = styled.div`${tw`text-lg font-bold`}`
const SubHeading = styled.div`${tw`text-sm font-bold opacity-50`}`
const Image = styled.img`${tw`rounded-lg w-14 p-1`}`

const Songs = ({ data }) => {
  const [id, setId] = useState('')

  useEffect(() => {
    localStorage.setItem('playback', id)
  }, [id])

  return (
    <Container>
      {data && data?.map((song, index) => (
        <SubContainer id={song?.id} onClick={() => setId(song?.id)}>
          <Image 
            src={song?.image[0]?.link || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'} 
            alt={song?.title + "'s Image"}
          />
          <div>
            <Heading>{song?.title}</Heading>
            <SubHeading>{song?.singers}</SubHeading>
          </div>
        </SubContainer>
      ))}
    </Container>
  )
}

export default Songs