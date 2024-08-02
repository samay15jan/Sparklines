import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  ${tw`w-full text-center hover:cursor-pointer`}
`
const SubContainer = styled.div`
  ${tw`rounded-xl`}
  transition: background 0.3s ease;
  &:hover {
    background: #2a2a2a;
  }
`
const Heading = styled.div`
  ${tw`text-lg font-bold max-w-52`}
`
const SubHeading = styled.div`
  ${tw`text-sm font-bold opacity-50 max-w-52`}
`
const Image = styled.img`
  ${tw`rounded-full mt-6`}
`

const Artists = ({ data, isArtistPage }) => {
  const navigate = useNavigate()

  function handleMenu(id) {
    navigate(`/dashboard/artist/${id}`)
  }

  return (
    <Container className={isArtistPage ? 'overflow-x-scroll my-2 flex px-7 hover:rounded-xl' : 'grid grid-cols-3 p-5 '}>
      {data &&
        data?.map((artist, index) => (
          <SubContainer
            id={artist?.id}
            className='w-1/2'
            onMouseDown={() => handleMenu(artist?.id)}
          >
            <Image
              className={isArtistPage ? 'ml-3 flex align-center w-44' : 'w-52'}
              src={
                artist?.image[2]?.link ||
                'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
              }
              alt={artist?.title + "'s Image"}
            />
            <div className='grid grid-cols-1'>
              <Heading>
                {artist?.title?.slice(0, 15) || artist?.name?.slice(0, 15)}
              </Heading>
              <SubHeading>
                {artist?.description?.slice(0, 15) ||
                  artist?.role?.slice(0, 15)}
              </SubHeading>
            </div>
          </SubContainer>
        ))}
    </Container>
  )
}

export default Artists
