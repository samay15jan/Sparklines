import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { FaCirclePlay } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  ${tw`relative bg-[#181818] w-full rounded-xl p-5`}
  transition: background 0.3s ease;
  &:hover {
    background: #2a2a2a;
  }
`

const Heading = styled.div`
  ${tw`text-2xl font-bold`}
`
const SubHeading = styled.div`
  ${tw`text-lg font-bold opacity-50`}
`
const Image = styled.img`
  ${tw`rounded-full w-28`}
`

const TopResults = ({ data }) => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  function handleMenu(id) {
    navigate(`/dashboard/artist/${id}`)
  }

  return (
    <Container
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      id={data?.id}
      onClick={() => handleMenu(data?.id)}
    >
      <Image
        src={
          data?.image[2]?.link ||
          data?.image[1]?.link ||
          'https://www.jiosaavn.com/_i/3.0/artist-default-music.png'
        }
        alt={data?.title + "'s Image"}
      />
      <div className={show ? '' : 'hidden'} onClick={() => setId(id)}>
        <FaCirclePlay
          size={55}
          color='#1ed760'
          className='absolute bottom-5 right-5 cursor-pointer drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-300 hover:scale-110'
        />
      </div>
      <div className='mt-2 h-auto place-self-center'>
        <Heading>{data?.title}</Heading>
        <SubHeading>{data?.description}</SubHeading>
      </div>
    </Container>
  )
}

export default TopResults
