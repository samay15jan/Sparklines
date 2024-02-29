import React, { useState } from 'react'
import Languages from './selectLanguages/Languages'
import Artists from './selectArtists/Artists'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Helmet } from 'react-helmet-async';

const Heading = styled.h1`${tw`text-4xl font-bold px-20 pt-10 pb-10`}`

const FirstLogin = ({ closeMenu, returnData }) => {
  const [menu, setMenu] = useState(true)
  const [selectedLang, setSelectedLang] = useState('')
  const [selectedArtists, setSelectedArtist] = useState('')

  const handleLanguages = (data) => {
    setSelectedLang(data)
  }
  
  const handleArtists = (data) => {
    setSelectedArtist(data)
  }

  const checkSelected = () => {
    if(selectedArtists.length === 0){
      return 0
    } else if(selectedArtists.length > 3){
      return 3
    } else {
      return selectedArtists.length
    }
  }

  const finishSetup = () => {
    returnData(selectedLang, selectedArtists)
  }

  return (
    <div>
      <Helmet>
        <title>{menu ? 'Select Language' : 'Select Artists'}</title>
        <meta name='description' content='First Login Preferences' />
      </Helmet>
      <Heading>
        {menu 
          ? 'Select Language' 
          : `Select Artists (${checkSelected()}/${3})`
        }
      </Heading>
      {menu 
          ? <Languages 
              onNext={() => setMenu(false)} 
              selectedData={handleLanguages}
            />
          : <Artists 
              selectedData={handleArtists}
              languages={selectedLang}
              onShowNext={selectedArtists >= 3 ? true : false}
              onNext={finishSetup}
              onSkip={closeMenu}
            />
      }
    </div>
  )
}

export default FirstLogin