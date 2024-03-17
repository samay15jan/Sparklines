import React, { useEffect, useState } from 'react'
import Button from './Button'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`relative`}`
const SubContainer = styled.div`${tw`grid grid-cols-4 mx-20`}`
const NextButton = styled.div`${tw`absolute right-0 mx-20 mt-10 px-10 py-3 border-2 rounded-md text-2xl font-bold`}`

const Languages = ({ onNext, selectedData }) => {
  const [selectedLang, setSelectedLang] = useState([]);
  const values = ['English', 'Hindi', 'Punjabi', 'Haryanvi', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Kannada', 'Bhojpuri', 'Malayalam', 'Urdu', 'Rajasthani', 'Odia', 'Assamese']

  const generateColor = (index) => {
    const Colors = ["#4D0000", "#552055", "#4D4D00", "#004D00", "#004D4D", "#00004D", "#27003A", "#4D004D", "#203C26", "#4D3820", "#550000", "#554000", "#555500", "#005500", "#005555", "#000055", "#2A0040", "#550055", "#550020", "#553C20", "#555520", "#205520", "#205555", "#1F1F55", "#3C2055", "#552055", "#55203C", "#2C1D00", "#203C26", "#1F2040"];
    return Colors[index]
  }

  const handleSelection = (lang) => {
    const isSelected = selectedLang.includes(lang)
    if (!isSelected) {
      setSelectedLang([...selectedLang, lang])
    } else {
      const updatedLang = selectedLang.filter((element) => element !== lang)
      setSelectedLang(updatedLang)
    }
  }

  useEffect(() => {
    selectedData(selectedLang)
  }, [selectedLang])

  return (
    <Container>
      <SubContainer>
        {values.map((lang, index) => (
          <div key={index}>
            <Button lang={lang} color={generateColor(index)} onClick={handleSelection} />
          </div>
        ))}
      </SubContainer>
      {selectedLang.length != 0 && <NextButton onClick={onNext}>Next</NextButton>}
    </Container>
  )
}

export default Languages