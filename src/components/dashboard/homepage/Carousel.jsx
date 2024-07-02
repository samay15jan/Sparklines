import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

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
  const [id, setId] = useState('')

  useEffect(() => {
    localStorage.setItem('playback', id)
  }, [id])

  function handleType() {
    if(typeId === '1'){
      setId(data.id)
    }
    if(typeId === '2' || typeId === '4' ){
      
    }
    if(typeId === '2'){
      
    }
  }

  return (
    <Container>
      {CarouselData && CarouselData?.map((data) => (
          <SubContainer key={data.id} onClick={handleType}>
            <CarouselImage image={data.image} title={data.name || data.title} />
            <CarouselTitle title={data.name || data.title} />
            <CarouselArtists artists={data.primaryArtists} followers={data.subtitle} />
          </SubContainer>
      ))}
    </Container>
  )
}

const CarouselImage = ({ image, title }) => {
  return (
    <Image
      src={image[1]?.link || 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'}
      alt={title + "'s Image"}
    />
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