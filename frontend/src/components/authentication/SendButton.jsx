import { useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { BallTriangle } from 'react-loader-spinner'

const Button = styled.button`
  ${tw`flex justify-center items-center w-full mt-5 text-white text-xl h-14 rounded-md bg-[#23233f]`}
  transition: background 0.3s ease;
  &:hover {
    background: #db916a;
    color: white;
  }
  &:focus {
    outline: 1px solid black;
    background: #db916a;
  }
`

const SendButton = ({ value, onclick }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(!loading)
      }, 1000)
    }
  }, [loading])

  const LoadingComponent = (
    <BallTriangle
      height={40}
      width={40}
      radius={4}
      color='#FFFFFF'
      ariaLabel='ball-triangle-loading'
      visible={true}
    />
  )

  return (
    <Button onClick={() => setLoading(true) || onclick()} type='submit'>
      {loading ? LoadingComponent : value}
    </Button>
  )
}

export default SendButton
