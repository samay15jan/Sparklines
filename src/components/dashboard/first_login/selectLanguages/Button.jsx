import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const ButtonUI = styled.div`${tw`p-5 text-xl font-bold m-2 hover:cursor-pointer rounded-xl border-2 shadow-2xl`}
background-color: ${({ bgcolor }) => bgcolor};
border-color: ${({ border }) => border ? 'white' : 'black'};
`

const Button = ({ lang, color, onClick }) => {
  const [border, setBorder] = useState(false)

  return (
    <ButtonUI
      bgcolor={color}
      border={border}
      onClick={() => {onClick(lang); setBorder(!border);}}
    >
      <div className='select-none'>
        {lang}
      </div>
    </ButtonUI>
)
}

export default Button