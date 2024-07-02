import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const Logo = styled.img`${tw`w-auto rounded-full drop-shadow-2xl`}`

const Bar1 = ({ response }) => {
  const data = response && response.data.trending.songs
  const filteredSongs = data && data.filter(song => {
    return song.primaryArtists[0]?.image[2]?.link !== undefined
  })
  let finalData = filteredSongs?.slice(1, 8)

  return (
    <div className='flex p-2 mt-20 w-96 justify-center -space-x-4 overflow-hidden mb-5 h-20 rounded-full bg-[#dad4f1]'>
      {finalData &&
        finalData.map((song) => (
          <Logo className='transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none' src={song.primaryArtists[0]?.image[2]?.link} />
        ))
      }
    </div>
  )
}

export default Bar1