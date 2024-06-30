import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`flex`}`
const SearchInput = styled.input`${tw`bg-[#242424] text-white text-sm px-5 py-2 rounded-full drop-shadow-md`}
&:hover {
  background: #2a2a2a;
}
&:focus {
  outline: 2px solid white;
}
`

const Input = ({ SearchText }) => {
  const [selected, setSelected] = useState(false)

  return (
    <Container>
      <SearchInput
        accessKey='s'
        onClick={() => setSelected(!selected)}
        type="text"
        selected={selected}
        placeholder='What do you want to play?'
        onChange={(event) => SearchText(event.target.value)}
      />
    </Container>
  )
}

export default Input