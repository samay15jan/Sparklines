import React, { useState } from 'react'
import Languages from './selectLanguages/Languages'
import Artists from './selectArtists/Artists'

const FirstLogin = ({ onClick }) => {
  const [menu, setMenu] = useState(true)
  const [lang, setLang] = useState()
  
  const handleLanguages = (data) => {
    setLang(data)
  }

  return (
    <div>
      {menu 
          ? <Languages 
              onNext={() => setMenu(false)} 
              selectedData={handleLanguages}
            />
          : <Artists 
              onClick={onClick}
              languages={lang}
            />
      }
    </div>
  )
}

export default FirstLogin