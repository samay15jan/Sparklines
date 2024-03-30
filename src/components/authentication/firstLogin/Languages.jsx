import React, { lazy, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Helmet } from 'react-helmet-async'
import { addLanguages } from '../../../utils/authMethods'
import { useNavigate } from 'react-router-dom'
const SendButton = lazy(() => import('../SendButton'))
const Button = lazy(() => import('./Button'))

const Heading = styled.h1`${tw`text-2xl font-bold text-center mb-5`}`
const SubContainer = styled.div`${tw`grid grid-cols-3`}`
const Error = styled.div`${tw`flex justify-center text-lg font-medium`}`

const Languages = () => {
  const [selectedLang, setSelectedLang] = useState([])
  const [response, setResponse] = useState('')
  const navigate = useNavigate()
  const values = ['English', 'Hindi', 'Punjabi', 'Haryanvi', 'Telugu', 'Marathi', 'Gujarati', 'Bengali', 'Rajasthani']
  const handleSelection = (lang) => {
    const isSelected = selectedLang.includes(lang)
    if (!isSelected) {
      setSelectedLang([...selectedLang, lang])
    } else {
      const updatedLang = selectedLang.filter((element) => element !== lang)
      setSelectedLang(updatedLang)
    }
  }

  const handleClick = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if(selectedLang.length < 0){
        setResponse('Select atleast one language')
      }
      const data = {languages: selectedLang, userId: userId}
      const language = await addLanguages(data)
      if(language){
        localStorage.setItem('languages', language)
      } else{
        setResponse('Failed!')
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <Helmet>
        <title>Select Language</title>
        <meta name='description' content='First Language Preferences' />
      </Helmet>
      <Heading>Select Language</Heading>

      <SubContainer>
        {values.map((lang, index) => (
          <div key={index}>
            <Button lang={lang} onClick={handleSelection} />
          </div>
        ))}
      </SubContainer>
      <Error>{response}</Error>
      <SendButton value='Finish' onclick={handleClick}/>
    
    </div>
  )
}

export default Languages