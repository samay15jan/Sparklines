import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  ${tw`grid grid-cols-3 w-full text-center rounded-xl p-5 hover:cursor-pointer`}
`
const Heading = styled.div`
  ${tw`text-lg font-bold max-w-52`}
`
const SubHeading = styled.div`
  ${tw`text-sm font-bold opacity-50 max-w-52`}
`
const Image = styled.img`
  ${tw`rounded-full w-52 mt-6`}
`

const Artists = ({ data }) => {
  const navigate = useNavigate()

  function handleMenu(id) {
    navigate(`/dashboard/artist/${id}`)
  }

  return (
    <Container>
      {data &&
        data?.map((artist, index) => (
          <div
            id={artist?.id}
            className='w-1/2'
            onMouseDown={() => handleMenu(artist?.id)}
          >
            <Image
              src={
                artist?.image[2]?.link ||
                'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
              }
              alt={artist?.title + "'s Image"}
            />
            <div className='grid grid-cols-1'>
              <Heading>{artist?.title?.slice(0, 15) || artist?.name?.slice(0, 15)}</Heading>
              <SubHeading>{artist?.description?.slice(0, 15) || artist?.role?.slice(0, 15)}</SubHeading>
            </div>
          </div>
        ))}
    </Container>
  )
}

export default Artists
