import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  ${tw`flex  w-full rounded-xl p-5`}
`
const Heading = styled.div`
  ${tw`text-lg font-bold max-w-52`}
`
const Image = styled.img`
  ${tw`rounded-xl w-52`}
`

const Playlists = ({ data }) => {
  const navigate = useNavigate()

  function handleMenu(id) {
    navigate(`/dashboard/playlist/${id}`)
  }

  return (
    <Container>
      {data &&
        data?.map((playlist, index) => (
          <div
            id={playlist?.id}
            className='w-1/2 p-2'
            onClick={() => handleMenu(playlist?.id)}
          >
            <Image
              src={
                playlist?.image[2]?.link ||
                'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
              }
              alt={playlist?.title + "'s Image"}
            />
            <div className='grid grid-cols-1'>
              <Heading>{playlist?.title}</Heading>
            </div>
          </div>
        ))}
    </Container>
  )
}

export default Playlists
