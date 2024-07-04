import React, { lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
const TopResults = lazy(() => import('./TopResults'))
const Songs = lazy(() => import('./Songs'))
const Artists = lazy(() => import('./Artists'))
const Albums = lazy(() => import('./Albums'))
const Playlists = lazy(() => import('./Playlists'))

const Container = styled.div`
  ${tw`mt-5 w-auto justify-center`}
`
const Heading = styled.div`
  ${tw`text-2xl my-2 font-extrabold max-w-52`}
`

const Response = ({ topResults, songs, albums, artists, playlists }) => {
  return (
    <Container>
      <div className='grid grid-cols-2 px-5 gap-4'>
        <div>
          <Heading>Top result</Heading>
          <TopResults data={topResults[0]} />
        </div>
        <div>
          <Heading>Songs</Heading>
          <Songs data={songs} />
        </div>
      </div>

      <div className='grid grid-cols-1 px-5'>
        <Heading>Albums</Heading>
        <Albums data={albums} />
      </div>

      <div className='grid grid-cols-1 px-5'>
        <Heading>Artists</Heading>
        <Artists data={artists} />
      </div>

      <div className='grid grid-cols-1 px-5'>
        <Heading>Playlists</Heading>
        <Playlists data={playlists} />
      </div>
    </Container>
  )
}

export default Response
