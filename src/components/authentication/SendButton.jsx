import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Button = styled.button`${tw`w-full mt-5 text-white text-xl h-14 rounded-md bg-[#23233f]`}
transition: background 0.3s ease;
&:hover {
    background: #db916a;
    color: white;
}
&:focus {
  outline: 1px solid black;
  background: #db916a;

}`

const SendButton = ({ value, onclick }) => {
  return (
    <Button onClick={() => onclick()} type='submit'>{value}</Button>
  )
}

export default SendButton