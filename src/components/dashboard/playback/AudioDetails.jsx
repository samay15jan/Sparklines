import styled from 'styled-components'
import tw from 'twin.macro'

import useRQGlobalState from '../../../utils/useRQGlobalState'
import { useNavigate } from 'react-router-dom'

const Image = styled.img`
  ${tw`w-16 h-16 rounded-lg p-1 ml-[6px] mr-1 pointer-events-none`}
`
const Heading = styled.div`
  ${tw`px-1 mt-3 opacity-80 cursor-pointer`}
`
const SubHeading = styled.div`
  ${tw`flex gap-1 px-1 text-[12px] opacity-50`}
`

const AudioData = () => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const data = currentSong?.data
  const artistName = data?.primaryArtists?.split(',')?.slice(0, 2)
  const artistId = data?.primaryArtistsId
    ?.replaceAll(' ', '')
    .split(',')
    ?.slice(0, 2)

  const navigate = useNavigate()

  function handleMenu(type, id) {
    navigate(`/dashboard/${type}/${id}`)
  }

  return (
    <>
      {data ? (
        <>
          <Image src={data?.image[0]?.link} alt='' />
          <div className='grid grid-rows-2'>
            <Heading
              className='hover:underline'
              onClick={() => handleMenu('track', data?.id)}
            >
              {data?.name.length > 20
                ? data?.name.slice(0, 20) + '...'
                : data?.name.slice(0, 20)}
            </Heading>
            <SubHeading>
              {artistName.map((name, index) => (
                <h1
                  className='hover:underline cursor-pointer'
                  key={index}
                  onClick={() => handleMenu('artist', artistId[index])}
                >
                  {name}
                </h1>
              ))}
            </SubHeading>
          </div>
        </>
      ) : (
        <>
          <div className='w-12 h-12 m-2 rounded-md animate-pulse bg-white opacity-20' />
          <div className='grid grid-rows-2 opacity-20'>
            <Heading className='w-40 h-4 rounded-md animate-pulse bg-white' />
            <SubHeading className='w-28 h-4 rounded-md animate-pulse bg-white' />
          </div>
        </>
      )}
    </>
  )
}

export default AudioData
