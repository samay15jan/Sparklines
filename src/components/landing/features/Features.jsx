import { lazy, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa6'
import { GoArrowUpRight } from 'react-icons/go'
import { RiCompassDiscoverLine } from 'react-icons/ri'
const Heading = lazy(() => import('./Heading'))
const Bar1 = lazy(() => import('./Bar1'))
const Bar2 = lazy(() => import('./Bar2'))
const MenuCard = lazy(() => import('./MenuCard'))
const TopArtists = lazy(() => import('./TopArtists'))
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Features = ({ response }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className='relative mt-0 mx-5 ml-14 w-auto h-screen grid-cols-3 hidden lg:grid'>
        <div
          onMouseEnter={() =>
            count > 6 ? setCount(0) : setCount((prev) => prev + 1)
          }
        >
          <Heading />
          <MenuCard
            image={response && response?.data?.albums[count]?.image[2]?.link}
            menuName='favourites'
            menuIcon1={<FaHeart />}
            menuIcon2={<GoArrowUpRight />}
            heading='Always your favourites'
            theme='light'
            subHeading='Craft personalized playlists with your favorite artists on an empty canvas.'
          />
        </div>
        <div>
          <Bar1 response={response} />
          <Bar2 />
          <MenuCard
            image='/icons/bars.png'
            menuName='discovers'
            menuIcon1={<RiCompassDiscoverLine />}
            menuIcon2={<GoArrowUpRight />}
            heading='New albums & recognition'
            theme='dark'
            subHeading='Our database never stop growing, it means endless discovering.'
          />
        </div>
        <div>
          <TopArtists
            image={
              (response &&
                response?.data?.trending?.songs[0]?.primaryArtists[0]?.image[2]
                  ?.link) ||
              response?.data?.trending?.songs[1]?.primaryArtists[0]?.image[2]
                ?.link
            }
            menuName='popular'
            menuIcon1={<FaStar />}
            menuIcon2={<GoArrowUpRight />}
            heading='Listen to top artists anywhere'
            subHeading='Listen to most popular, bright and trending musicians'
            buttonText='EXPLORE'
            buttonImage='/icons/visualizer.png'
          />
        </div>
      </div>
      <div className='relative flex flex-rows-flow lg:hidden my-20 mx-5'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={false}
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide className='w-screen'>
            <div className='w-full'>
              <Bar1 response={response} />
              <Bar2 />
              <MenuCard
                image='/icons/bars.png'
                menuName='discovers'
                menuIcon1={<RiCompassDiscoverLine />}
                menuIcon2={<GoArrowUpRight />}
                heading='New albums & recognition'
                theme='dark'
                subHeading='Our database never stop growing, it means endless discovering.'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='w-screen'>
            <div className='w-full'>
              <TopArtists
                image={
                  (response &&
                    response?.data?.trending?.songs[0]?.primaryArtists[0]
                      ?.image[2]?.link) ||
                  response?.data?.trending?.songs[1]?.primaryArtists[0]
                    ?.image[2]?.link
                }
                menuName='popular'
                menuIcon1={<FaStar />}
                menuIcon2={<GoArrowUpRight />}
                heading='Listen to top artists anywhere'
                subHeading='Listen to most popular, bright and trending musicians'
                buttonText='EXPLORE'
                buttonImage='/icons/visualizer.png'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide
            onMouseEnter={() =>
              count > 6 ? setCount(0) : setCount((prev) => prev + 1)
            }
          >
            <div className='w-full p-1 rounded-t-2xl bg-slate-200'>
              <Heading />
              <MenuCard
                image={
                  response && response?.data?.albums[count]?.image[2]?.link
                }
                menuName='favourites'
                menuIcon1={<FaHeart />}
                menuIcon2={<GoArrowUpRight />}
                heading='Always your favourites'
                theme='light'
                subHeading='Craft personalized playlists with your favorite artists on an empty canvas.'
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Features
