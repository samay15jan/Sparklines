import React, {useState} from 'react'
import Button from './Button'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw``}`
const Heading = styled.h1`${tw`text-4xl font-bold px-20 pt-20 pb-10`}`
const SubContainer = styled.div`${tw`grid grid-cols-4 mx-20`}`
const NextButton = styled.button`${tw`absolute right-0 mx-20 my-10 px-10 py-3 border-2 rounded-md text-2xl font-bold`}`

const Languages = () => {
    const [selectedLang, setSelectedLang] = useState([]);
    const values = ['English', 'Hindi', 'Punjabi', 'Haryanvi', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Kannada', 'Bhojpuri', 'Malayalam', 'Urdu', 'Rajasthani', 'Odia', 'Assamese']

    const generateColor = (index) => {
        const Colors = ["#4D0000", "#552055", "#4D4D00", "#004D00", "#004D4D", "#00004D", "#27003A", "#4D004D", "#203C26", "#4D3820", "#550000", "#554000", "#555500", "#005500", "#005555", "#000055", "#2A0040", "#550055", "#550020", "#553C20", "#555520", "#205520", "#205555", "#1F1F55", "#3C2055", "#552055", "#55203C", "#2C1D00", "#203C26", "#1F2040"];
        return Colors[index]
    }

    const handleSelection = (lang) => {
        const index = selectedLang.indexOf(lang)
        if(index == -1) {
            selectedLang.push(lang)
        }else {
            selectedLang.splice(index)
        }
        setSelectedLang([...selectedLang]);
    }
    
    return (
      <Container>
        <Heading>Select Language</Heading>
        <SubContainer>
            {values.map((lang, index) => (
              <div key={index}>
                <Button lang={lang} color={generateColor(index)} onClick={handleSelection}/>
              </div>
            ))}
        </SubContainer>
        {selectedLang.length > 0  && <NextButton>Next</NextButton>}
      </Container>
  )
}

export default Languages