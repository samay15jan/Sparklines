import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { FaCirclePlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { songDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const Container = styled.div`
  ${tw`p-2 cursor-pointer grid grid-flow-col overflow-x-auto text-sm font-bold`}
`
const SubContainer = styled.div`
  ${tw`grid grid-cols-1 p-5 w-48 rounded-xl`}
  transition: background 0.3s ease;
  &:hover {
    background: #2a2a2a;
  }
`
const Image = styled.img`
  ${tw`rounded-xl`}
`
const Heading = styled.div`
  ${tw`px-1 pt-2`}
`
const SubHeading = styled.div`
  ${tw`px-1 opacity-50`}
`

const Carousel = ({ CarouselData, typeId }) => {
  const navigate = useNavigate()

  function handleMenu(id) {
    if (typeId == 1) {
      navigate(`/dashboard/track/${id}`)
    }
    if (typeId == 2 || typeId == 4) {
      navigate(`/dashboard/playlist/${id}`)
    }
    if (typeId == 3) {
      navigate(`/dashboard/album/${id}`)
    }
  }

  return (
    <Container>
      {CarouselData &&
        CarouselData?.map((data) => (
          <SubContainer key={data.id} onClick={() => handleMenu(data.id)}>
            <CarouselImage
              image={data.image}
              title={data.name || data.title}
              id={data.id}
              typeId={typeId}
              CarouselData={CarouselData}
            />
            <CarouselTitle title={data.name || data.title} />
            <CarouselArtists
              artists={data.primaryArtists}
              followers={data.subtitle}
              typeId={typeId}
            />
          </SubContainer>
        ))}
    </Container>
  )
}

const CarouselImage = ({ image, title, id, typeId, CarouselData }) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useRQGlobalState('playbackQueue', null)

  const handleClick = async (newId) => {
    if (typeId == 1) {
      const { data } = await songDetails(newId)
      setData(data)
    }
    if (typeId == 2 || typeId == 4 || typeId == 3) {
      setData(CarouselData)
    }
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Image
        src={
          image[1]?.link ||
          'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
        }
        alt={title + "'s Image"}
      />
      <div className={show ? '' : 'hidden'} onClick={(e) => { e.stopPropagation(); handleClick(id) }}>
        <FaCirclePlay
          size={40}
          color='#1ed760'
          className='absolute bottom-2 right-3 drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-300 hover:scale-110'
        />
      </div>
    </div>
  )
}

const CarouselTitle = ({ title }) => {
  const shortedTitle =
    title?.length > 15
      ? title?.substring(0, 15) + '...'
      : title?.substring(0, 15)
  return <Heading>{shortedTitle ? shortedTitle : 'Unknown Albumn'}</Heading>
}

const CarouselArtists = ({ artists, followers, typeId }) => {
  var shortedNames

  if (typeId == 1) {
    if (artists) {
      const arrayOfArtists = []
      artists?.map((artist) => arrayOfArtists.push(artist.name))
      const artistNames = arrayOfArtists.join(', ')
      shortedNames =
        artistNames?.length > 15
          ? artistNames?.substring(0, 15) + '...'
          : artistNames?.substring(0, 15)
    }
    if (typeId == 3) {
      shortedNames = artists
    }
  }
  
  return (
    <SubHeading>
      {artists ? (shortedNames ? shortedNames : 'Unknown Artist') : followers}
    </SubHeading>
  )
}

export default Carousel
