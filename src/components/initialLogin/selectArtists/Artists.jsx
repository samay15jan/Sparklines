import React, { useEffect, useState } from 'react'
import Data from './artistsData.json'
import Button from './Button'
import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`${tw`py-5`}`
const SubContainer = styled.div`${tw`grid grid-cols-5 grid-flow-row max-h-96 overflow-x-auto place-items-center mx-60`}`
const MenuButton = styled.button`${tw`absolute right-0 mx-20 my-10 px-10 py-3 border-2 rounded-md text-2xl font-bold`}`

const Artists = ({ selectedData, languages, onNext, onSkip }) => {
  const [artists, setArtists] = useState([])
  const [selectedArtists, setSelectedArtist] = useState('')

  useEffect(() => {
      const selectedArtists = languages.map((lang) => {
        const artistsForLang = Data.filter((item) => item.language === lang)
          .map((item) => item.artists)
        return { language: lang, artists: artistsForLang[0] }
      })
      setArtists(selectedArtists)
  }, [languages])


  const handleSelection = (id) => {
    const isSelected = selectedArtists.includes(id)
    if(!isSelected) {
      setSelectedArtist([...selectedArtists, id])
    }else {
      const updatedArtist = selectedArtists.filter((item) => item !== id)
      setSelectedArtist(updatedArtist)
    }
  }

  useEffect(() => {
    setSelectedArtist(selectedArtists)
    selectedData(selectedArtists)
  }, [selectedArtists])

  return (
    <Container>
      <SubContainer>
        {artists.length > 0 &&
          artists.map((item) => (
            item.artists.map((artist) => (
              <div>
                <Button artist={artist} onClick={handleSelection}/>
              </div>
            ))
          )) 
        }
      </SubContainer>
      <div className='flex justify-between w-screen'>
        { 
          <MenuButton 
            onClick={selectedArtists.length >= 3 ? onNext : onSkip}
          >
            {selectedArtists.length >= 3 ? 'Next' : 'Skip'}
          </MenuButton>
        }
      </div>
    </Container>
  )
}

export default Artists