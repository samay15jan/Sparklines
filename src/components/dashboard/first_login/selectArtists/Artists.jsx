import React, { useEffect, useState } from 'react'
import Data from './artistsData.json'
import Button from './Button'
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`${tw`grid grid-cols-5 mx-56`}`

const Artists = ({ languages }) => {
  const [artists, setArtists] = useState([])

  useEffect(() => {
      const selectedArtists = languages.map((lang) => {
        const artistsForLang = Data.filter((item) => item.language === lang)
          .map((item) => item.artists)
        return { language: lang, artists: artistsForLang[0] }
      })
      setArtists(selectedArtists)
  }, [languages])

  return (
    <Container>
      {artists.length > 0 &&
        artists.map((item) => (
          item.artists.map((artist) => (
            <div>
              <Button artist={artist} />
            </div>
          ))
        )) 
      }
    </Container>
  )
}

export default Artists