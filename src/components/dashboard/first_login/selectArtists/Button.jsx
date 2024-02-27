import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`${tw``}`
const RoundedImage = styled.img`${tw`rounded-full`}`

const Button = ({ artist }) => {
  const [artistData, setArtistData] = useState()

  useEffect(() => {
    const getArtistData = async (artist) => {
      try {
        const response = await fetch(`https://sparklines-backend.vercel.app/search/artists?query=${artist}?limit=1`)
        const artistData = await response.json()
        const artistID = artistData?.data?.results[0]?.id
        const artistName = artistData?.data?.results[0]?.name
        const artistImages = artistData?.data?.results[0]?.image
        setArtistData({ id: artistID, name: artistName, image: artistImages })
      } catch (error) {
        console.log('An error occured while getting artists data')
      }
    }
    getArtistData(artist)
  }, [artist]);

  console.log(artistData)
  return (
    <div>
      {artistData?.image && 
        <Container>
          <RoundedImage src={artistData?.image[1]?.link} alt={artistData?.name} />
        </Container>
      }
    </div>
  )
}

export default Button