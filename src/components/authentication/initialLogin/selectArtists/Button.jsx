import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import DefaultProfile from '../../../../assets/homepage/DefaultProfile.png'

const Container = styled.div`${tw`m-2 w-36`}`
const RoundedImage = styled.img`${tw`rounded-full ring-white opacity-100`}
${({ border }) => border ? tw`ring-4 opacity-100` : ''}
`

const Button = ({ artist, onClick }) => {
  const [artistData, setArtistData] = useState()
  const [border, setBorder] = useState(false)

  useEffect(() => {
    const getArtistData = async (artist) => {
      try {
        const response = await fetch(`https://sparklines-backend.vercel.app/search/artists?query=${artist}?limit=1`)
        const artistData = await response.json()
        const artistID = artistData?.data?.results[0]?.id
        const artistName = artistData?.data?.results[0]?.name
        const artistImages = () => {
          if(artistData?.data?.results?.length > 0){
            return artistData?.data?.results[0]?.image
          }else {
            return 'null'
          }
        }
        setArtistData({ id: artistID, name: artistName, image: artistImages() })
      } catch (error) {
        console.log('An error occured while getting artists data')
      }
    }
    getArtistData(artist)
  }, [artist]);

  const checkImage = () => {
    if(artistData?.image !== 'null'){
      return artistData?.image[2]?.link
    }else{
      return DefaultProfile 
    }
  }

  return (
    <div>
      {artistData?.image && 
        <Container
          onClick={() => onClick(artistData?.id)}>
          <RoundedImage
            border={border}
            onClick={() => setBorder(!border)}
            src={checkImage()} 
            alt={artistData?.name}
          />
        </Container>
      }
    </div>
  )
}

export default Button