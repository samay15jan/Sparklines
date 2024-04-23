import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { LineWave } from 'react-loader-spinner'

const Container = styled.div`${tw`w-full h-screen flex flex-col items-center justify-center`}`
const Text = styled.div`${tw`text-xl`}`

const Loading = () => {
    const [selected, setSelected] = useState('')
    const quotes = {
        1: "Jamming in progress... Just hold the applause",
        2: "Please stand by... Finding the perfect beat takes time!",
        3: "Almost there! Just tuning the virtual instruments",
        4: "Hold tight! We're spinning the digital vinyl",
        5: "Just a sec! Quieting the noisy internet neighbors",
    }

    useEffect(() => {
        setTimeout(() => {
            const number = Math.floor(Math.random() * 6)
            setSelected(quotes[number])    
        }, 50);
    }, [])

    return (
        <Container>
            <LineWave
                color="white"
                visible={true}
                height="150"
                width="150"
                ariaLabel="line-wave-loading"
            />
            <Text>{selected}</Text>
        </Container>
    )
}

export default Loading