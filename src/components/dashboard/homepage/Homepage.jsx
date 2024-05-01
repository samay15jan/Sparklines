import React, { useEffect, useState } from 'react'
import { homepageData } from '../../../utils/apiMethods'
import Carousel from './Carousel'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`p-10 pb-20`}`
const Heading = styled.div`${tw`mt-5 text-2xl font-bold`}`

const Homepage = ({ playbackID }) => {
  const [data, setData] = useState()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const response = await homepageData()
    setData(response)
  }

  return (
    <Container>
      <Heading>Trending Songs</Heading>
      {data &&
        <Carousel CarouselData={data.data.trending.songs} playbackID={(id) => playbackID(id)} />
      }

      <Heading>Playlists you can't miss</Heading>
      {data &&
        <Carousel CarouselData={data.data.playlists} playbackID={(id) => playbackID(id)} />
      }

      <Heading>Popular Albums</Heading>
      {data &&
        <Carousel CarouselData={data.data.albums} playbackID={(id) => playbackID(id)}/>
      }

      <Heading>Top Charts</Heading>
      {data &&
        <Carousel CarouselData={data.data.charts} playbackID={(id) => playbackID(id)}/>
      }
    </Container>
  )
}

export default Homepage