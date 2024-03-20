import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`w-screen flex justify-center`}`
const SearchInput = styled.input`${tw`text-lg px-10 my-2 py-2 border border-2 rounded-full drop-shadow-md transition-all duration-300 ease-in-out`}
${({ selected }) => selected ? tw`w-screen mx-20 text-left` : tw`w-1/3 text-center`};
`

const Input = ({ close, SearchText }) => {
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        if (!close) {
            setSelected(false)
        }
    }, [close])

    return (
        <Container>
            <SearchInput
                onClick={() => setSelected(!selected)}
                type="text"
                selected={selected}
                placeholder='Search Anything'
                onChange={(event) => SearchText(event.target.value)}
            />
        </Container>
    )
}

export default Input