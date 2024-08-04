import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useParams, useNavigate } from 'react-router-dom'

const Container = styled.div`
  ${tw`flex`}
`
const SearchInput = styled.input`
  ${tw`bg-[#242424] text-white text-sm px-5 py-2 rounded-full drop-shadow-md`}
  &:hover {
    background: #2a2a2a;
  }
  &:focus {
    outline: 2px solid white;
  }
`

const Input = ({ SearchText }) => {
  const [newQuery, setNewQuery] = useState(null)
  const [temp, setTemp] = useState(null)
  let navigate = useNavigate()
  let { query } = useParams()

  useEffect(() => {
    if (query) {
      let modifiedText = query.replaceAll('+', ' ')
      setTemp(modifiedText)
    }
  }, [query])

  useEffect(() => {
    SearchText(newQuery)
  }, [newQuery])

  const handleInputChange = (event) => {
    const newText = event.target.value
    let modifiedText = newText.replace(/\s+/g, '+').trim() || ' '
    navigate(`/dashboard/search/${modifiedText}`)
    setNewQuery(newText)
  }

  return (
    <Container>
      <SearchInput
        accessKey='s'
        type='text'
        placeholder='What do you want to play?'
        onChange={(event) => handleInputChange(event)}
        value={newQuery}
      />
    </Container>
  )
}

export default Input
