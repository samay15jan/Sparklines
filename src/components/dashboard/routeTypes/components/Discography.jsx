import React, { useState, useEffect, lazy } from 'react'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { HiOutlineHeart } from 'react-icons/hi'
import { FaCirclePlay, FaRegClock } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { artistAlbums, artistSongs } from '../../../../api/apiMethods'
import { useNavigate, useParams } from 'react-router-dom'
import { LineWave } from 'react-loader-spinner'
const SongList = lazy(() => import('./SongList'))
const Song = lazy(() => import('./Song'))

const Discography = () => {
  const [data, setData] = useRQGlobalState('artistDetails', [
    { name: 'details', data: null },
    {
      name: 'songs',
      data: { popular: null, latest: null },
      page: 1,
      isLastPage: false,
    },
    {
      name: 'albums',
      data: { popular: null, latest: null },
      page: 1,
      isLastPage: false,
    },
    { name: 'playlists', data: null },
    { name: 'artists', data: null },
    { name: 'recommendations', data: null },
  ])
  const [showAlbum, setShowAlbum] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const { id } = useParams()
  const navigate = useNavigate()

  let songsData = data?.data?.find((category) => category.name === 'songs')
  let albumsData = data?.data?.find((category) => category.name === 'albums')
  const selectedMenu = !showAlbum ? 'songs' : 'albums'
  const selectedMenuData = !showAlbum ? songsData : albumsData

  useEffect(() => {
    if (!id || selectedMenuData?.isLastPage) return
    getArtistData()
  }, [showAlbum, inView])

  const updateCategory = (name, newData) => {
    setData((prevState) =>
      prevState.map((category) =>
        category.name === name ? { ...category, ...newData } : category
      )
    )
  }

  async function getArtistData() {
    let response
    response = !showAlbum
      ? await artistSongs(id, songsData?.page, 'latest')
      : await artistAlbums(id, albumsData?.page, 'latest')
    if (response?.data) {
      const newData = {
        results: selectedMenuData?.data?.latest
          ? [
              ...selectedMenuData?.data?.latest?.results,
              ...response?.data?.results,
            ]
          : response?.data.results,
        lastPage: response?.data?.lastPage,
        total: response?.data?.total,
      }
      if (response?.data?.results?.length > 0) {
        updateCategory(selectedMenu, { page: selectedMenuData.page + 1 }) // Updating page number
      } else {
        updateCategory(selectedMenu, { isLastPage: true }) //updating last page
      }

      updateCategory(selectedMenu, {
        data: {
          popular: selectedMenuData?.data?.popular || null,
          latest: newData,
        },
      }) // Updating specificSearch data
    }
  }

  return (
    <AnimatePresence>
      <div className='flex ml-10 mt-20 gap-2'>
        {data?.data?.slice(1, 3).map((category) => (
          <h1
            className={
              selectedMenu === category.name
                ? 'px-4 py-1 text-sm rounded-full bg-white text-black drop-shadow-md transition-colors duration-300 delay-75 cursor-pointer'
                : 'px-4 py-1 text-sm rounded-full bg-[#242424] drop-shadow-md transition-colors duration-300 delay-75 cursor-pointer hover:bg-white hover:text-black'
            }
            key={category.name}
            onClick={() => setShowAlbum(!showAlbum)}
            tw='cursor-pointer'
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </h1>
        ))}
      </div>

      <div
        className='relative'
        key='discography'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {showAlbum ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='mx-5 mt-5'
          >
            {selectedMenuData?.data?.latest && (
              <SongList
                menu='search'
                type='discography'
                songs={selectedMenuData?.data?.latest?.results}
                explicit={true}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='mx-5 mt-5'
          >
            {selectedMenuData?.data?.latest?.results?.map((song) => (
              <div className='my-10'>
                <div className='mb-5 mt-14 grid grid-cols-4'>
                  <img
                    src={song?.image[2]?.link}
                    className='ml-10 w-36 rounded-md'
                    alt=''
                  />
                  <div className='ml-5 col-span-3'>
                    <h1 className='flex text-3xl font-bold'>{song?.name}</h1>
                    <h1 className='flex text-sm mt-2 font-medium opacity-60'>
                      Single &#128900; {song?.year}
                    </h1>
                    <div className='flex gap-2 mt-3'>
                      <FaCirclePlay
                        size={30}
                        className='text-white hover:text-[#1ed760] ml-1 bottom-[-80px] drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-100 hover:scale-110'
                      />
                      <HiOutlineHeart opacity={0.6} size={30} />
                    </div>
                  </div>
                </div>
                <div className='mx-5'>
                  <div className='mx-5 opacity-80 text-sm flex justify-between'>
                    <div className='flex gap-6'>
                      <i>#</i>
                      <h1>Title</h1>
                    </div>
                    <div className='ml-40 mr-1'>
                      <h1>{song?.album?.name ? 'Album' : 'Single'}</h1>
                    </div>
                    <h1 className='mr-7'>
                      <FaRegClock size={15} />
                    </h1>
                  </div>
                  <hr className={'mx-5 mr-5 opacity-20 my-2'} />
                  <Song
                    menu='search'
                    songData={song}
                    index={0}
                    name={song?.name}
                    id={song?.id}
                    artistName={song?.artistName}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      <div ref={ref} className='flex w-full mb-5 justify-center'>
        {!selectedMenuData?.isLastPage && (
          <LineWave
            className='ml-6'
            color='white'
            visible={true}
            height='50'
            width='80'
            ariaLabel='line-wave-loading'
          />
        )}
      </div>
    </AnimatePresence>
  )
}

export default Discography
