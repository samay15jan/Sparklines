import styled from 'styled-components'
import tw from 'twin.macro'

import useRQGlobalState from '../../../utils/useRQGlobalState'
import { useNavigate } from 'react-router-dom'

const Image = styled.img`
  ${tw`w-12 h-12 rounded-lg mr-2 pointer-events-none select-none lg:h-14 lg:w-14 lg:rounded-md lg:mr-3`}
`
const Heading = styled.div`
  ${tw`px-1 opacity-80 cursor-pointer truncate text-[13px] lg:text-sm lg:font-semibold lg:opacity-90 lg:max-w-[180px]`}
`
const SubHeading = styled.div`
  ${tw`flex gap-1 px-1 text-[11px] opacity-50 truncate lg:mt-1 lg:text-xs`}
`

const AudioData = () => {
  const [currentSong] = useRQGlobalState('currentSong', null)
  const data = currentSong?.data
  const artistName = data?.primaryArtists?.split(',')?.slice(0, 1)
  const artistId = data?.primaryArtistsId
    ?.replaceAll(' ', '')
    .split(',')
    ?.slice(0, 1)

  const navigate = useNavigate()

  function handleMenu(type, id) {
    navigate(`/dashboard/${type}/${id}`)
  }

  return (
    <>
      {data ? (
        <>
          <Image src={data?.image[0]?.link} alt='' />
          <div className='grid min-w-0 grid-rows-2 gap-0.5 lg:justify-center'>
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