import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { FaCirclePlay } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'

const Container = styled.div`${tw`p-2 cursor-pointer grid grid-flow-col overflow-x-auto text-sm font-bold`}`
const SubContainer = styled.div`${tw`grid grid-cols-1 p-5 w-48 rounded-xl`}
transition: background 0.3s ease;
&:hover {
  background: #2a2a2a;
}`
const Image = styled.img`${tw`rounded-xl`}`
const Heading = styled.div`${tw`px-1 pt-2`}`
const SubHeading = styled.div`${tw`px-1 opacity-50`}`

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
      {CarouselData && CarouselData?.map((data) => (
        <SubContainer key={data.id} onClick={() => handleMenu(data.id)}>
          <CarouselImage image={data.image} title={data.name || data.title} id={data.id} />
          <CarouselTitle title={data.name || data.title} />
          <CarouselArtists artists={data.primaryArtists} followers={data.subtitle} />
        </SubContainer>
      ))}
    </Container>
  )
}

const CarouselImage = ({ image, title, id }) => {
  const [show, setShow] = useState(false)
  const [newId, setId] = useState('')

  useEffect(() => {
    localStorage.setItem('playback', newId)
  }, [newId])

  return (
    <div
      className='relative'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setId(id)}
    >
      <Image
        src={image[1]?.link || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'}
        alt={title + "'s Image"}
      />
      <div className={show ? '' : 'hidden'}>
        <FaCirclePlay
          size={40}
          color='#1ed760'
          className='absolute bottom-2 right-3 drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-y-1 duration-300 hover:scale-110'
        />
      </div>
    </div>
  )
}

const CarouselTitle = ({ title }) => {
  const shortedTitle = title?.length > 15 ? title?.substring(0, 15) + '...' : title?.substring(0, 15)
  return (
    <Heading>
      {shortedTitle ? shortedTitle : 'Unknown Albumn'}
    </Heading>
  )
}

const CarouselArtists = ({ artists, followers }) => {
  var shortedNames
  if (artists) {
    const arrayOfArtists = []
    artists?.map((artist) => arrayOfArtists.push(artist.name))
    const artistNames = arrayOfArtists.join(', ')
    shortedNames = artistNames?.length > 15 ? artistNames?.substring(0, 15) + '...' : artistNames?.substring(0, 15)
  }
  return (
    <SubHeading>
      {artists ?
        shortedNames ? shortedNames : 'Unknown Artist'
        : followers
      }
    </SubHeading>
  )
}


export default Carousel