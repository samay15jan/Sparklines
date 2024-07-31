import React, { lazy, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LineWave } from 'react-loader-spinner'
import { searchAll, searchSpecific } from '../../../api/apiMethods'
import Artists from './Artists'
const Input = lazy(() => import('./Input'))
const Response = lazy(() => import('./Response'))
const SongList = lazy(() => import('../routeTypes/components/SongList'))

const Search = () => {
  const [data, setData] = useState([
    { id: 1, name: 'all', page: 1, data: null, isLastPage: false },
    { id: 2, name: 'songs', page: 1, data: null, isLastPage: false },
    { id: 3, name: 'artists', page: 1, data: null, isLastPage: false },
    { id: 4, name: 'playlists', page: 1, data: null, isLastPage: false },
    { id: 5, name: 'albums', page: 1, data: null, isLastPage: false },
  ])
  const [searchText, setSearchText] = useState()
  const [selectedMenu, setSelectedMenu] = useState(1)
  const [isLastPage, setLastPage] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  })

  let searchData = data?.find((category) => category.id === selectedMenu)

  const updateCategory = (id, newData) => {
    setData((prevState) =>
      prevState.map((category) =>
        category.id === id ? { ...category, ...newData } : category
      )
    )
  }

  useEffect(() => {
    if (currentPath === `/dashboard/search/${query}`) {
      setSearchText(query)
    }
  }, [query])

  useEffect(() => {
    selectedMenu === 1 && getData()
    selectedMenu != 1 && getSpecificData()
  }, [searchText, selectedMenu, inView])

  async function getData() {
    const response = await searchAll(searchText)
    updateCategory(selectedMenu, { data: response?.data }) // Updating searchAll data
  }

  async function getSpecificData() {
    const selectedCategory = data.find(
      (category) => category.id === selectedMenu
    )
    const response = await searchSpecific(
      selectedCategory.name,
      searchText,
      selectedCategory?.page
    )
    if (response?.data) {
      const newData = {
        results: selectedCategory.data
          ? [...selectedCategory?.data?.results, ...response?.data?.results]
          : response?.data.results,
        start: response?.data?.start,
        total: response?.data?.total,
      }
      if (response?.data?.results?.length > 0) {
        updateCategory(selectedMenu, { page: selectedCategory.page + 1 }) // Updating page number
      } else {
        updateCategory(selectedMenu, { isLastPage: true }) //updating last page
      }

      updateCategory(selectedMenu, { data: newData }) // Updating specificSearch data
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className='p-5 mt-12'
        key='search'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className='relative flex'>
          <Input SearchText={(text) => setSearchText(text)} />
        </div>

        <div className='flex mt-6 gap-2'>
          {data.map((category) => (
            <h1
              className={
                selectedMenu === category.id
                  ? 'px-4 py-1 text-sm rounded-full bg-white text-black drop-shadow-md transition-colors duration-300 delay-75 cursor-pointer'
                  : 'px-4 py-1 text-sm rounded-full bg-[#242424] drop-shadow-md transition-colors duration-300 delay-75 cursor-pointer hover:bg-white hover:text-black'
              }
              key={category.id}
              onClick={() => setSelectedMenu(category.id)}
              tw='cursor-pointer'
            >
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </h1>
          ))}
        </div>

        {searchText != '' && data && (
          <>
            {selectedMenu === 1 && searchData?.data?.topQuery && (
              <Response
                topResults={searchData?.data?.topQuery?.results}
                songs={searchData?.data?.songs?.results}
                albums={searchData?.data?.albums?.results}
                artists={searchData?.data?.artists?.results}
                playlists={searchData?.data?.playlists?.results}
              />
            )}
            {selectedMenu === 2 && (
              <SongList
                menu='search'
                type='search'
                songs={searchData?.data?.results}
              />
            )}
            <div className='ml-20'>
            {selectedMenu === 3 && <Artists data={searchData?.data?.results} />}
            </div>
            {selectedMenu === 4 && (
              <SongList
                menu='search'
                type='search'
                songs={searchData?.data?.results}
              />
            )}
            {selectedMenu === 5 && (
              <SongList
                menu='search'
                type='search'
                songs={searchData?.data?.results}
              />
            )}
          </>
        )}
      </motion.div>
      <div className='flex w-full mb-5 justify-center'>
        {!searchData.isLastPage
          ? selectedMenu != 1 && (
              <div ref={ref}>
                <LineWave
                  className='ml-6'
                  color='white'
                  visible={true}
                  height='50'
                  width='80'
                  ariaLabel='line-wave-loading'
                />
              </div>
            )
          : 'x-x-x'}
      </div>
    </AnimatePresence>
  )
}

export default Search
