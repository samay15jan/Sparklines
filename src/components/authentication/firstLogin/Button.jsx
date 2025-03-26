import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const ButtonUI = styled.div`
  ${tw`text-center p-5 text-xl font-medium m-2 hover:cursor-pointer rounded-lg border-2 shadow-md`}
  border-color: ${({ border }) => (border ? '#db916a' : 'white')};
`

const Button = ({ lang, onClick }) => {
  const [border, setBorder] = useState(false)

  return (
    <ButtonUI
      border={border}
      onClick={() => {
        onClick(lang)
        setBorder(!border)
      }}
    >
      <div className='pointer-events-none select-none'>{lang}</div>
    </ButtonUI>
  )
}

export default Button
