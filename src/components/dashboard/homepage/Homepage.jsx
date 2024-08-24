import { lazy, useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { homepageData } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Carousel = lazy(() => import('./Carousel'))
const Skeleton = lazy(() => import('./Skeleton'))

const Heading = styled.div`
  ${tw`mt-5 text-2xl font-bold`}
`

const Homepage = () => {
  const [data, setData] = useRQGlobalState('homepageData', null)

  async function getData() {
    const { data } = await homepageData()
    setData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const types = [
    {
      id: 1,
      heading: 'Trending Songs',
      carouselData: data?.data?.trending?.songs,
    },
    {
      id: 2,
      heading: "Playlists you can't miss",
      carouselData: data?.data?.playlists,
    },
    {
      id: 3,
      heading: 'Popular Albums',
      carouselData: data?.data?.albums,
    },
    {
      id: 4,
      heading: 'Top Charts',
      carouselData: data?.data?.charts,
    },
  ]

  const fallback = [1, 2, 3, 4]

  return (
    <AnimatePresence>
      <motion.div
        className='p-5 mt-10'
        key='homepage'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {data
          ? types.map((type) => (
              <div key={type.id}>
                <Heading>{type.heading}</Heading>
                <Carousel CarouselData={type.carouselData} typeId={type.id} />
              </div>
            ))
          : fallback.map((type) => (
              <div key={type}>
                <Heading className='w-36 h-5 rounded-md bg-white animate-pulse opacity-20'></Heading>
                <Skeleton />
              </div>
            ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default Homepage
