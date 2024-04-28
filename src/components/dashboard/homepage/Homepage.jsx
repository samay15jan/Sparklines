import React, { useEffect, useState } from 'react'
import { homepageData } from '../../../utils/apiMethods'
import Carousel from './Carousel'
import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`${tw`m-10`}`
const Heading = styled.div`${tw`mt-5 text-2xl font-bold`}`

const Homepage = () => {
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
        <Carousel CarouselData={data.data.trending.songs} />
      }

      <Heading>Playlists you can't miss</Heading>
      {data &&
        <Carousel CarouselData={data.data.playlists} />
      }

      <Heading>Popular Albums</Heading>
      {data &&
        <Carousel CarouselData={data.data.albums} />
      }

      <Heading>Top Charts</Heading>
      {data &&
        <Carousel CarouselData={data.data.charts} />
      }
    </Container>
  )
}

export default Homepage