import React, { lazy, useEffect, useState } from 'react'
import Response from './Response'
import { searchAll } from '../../../api/apiMethods'
import { useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
const Input = lazy(() => import('./Input'))
const UserProfile = lazy(() => import('../profile/UserProfile'))

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [apiResponse, setApiResponse] = useState('')
  const location = useLocation()
  const currentPath = location.pathname
  let { query } = useParams()

  useEffect(() => {
    if (currentPath === `/dashboard/search/${query}`) {
      setSearchText(query)
    }
  }, [query])

  useEffect(() => {
    getData()
  }, [searchText])

  async function getData() {
    const response = await searchAll(searchText)
    setApiResponse(response?.data)
  }

  return (
    <AnimatePresence>
      <motion.div
        className='p-5'
        key="search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className='relative flex'>
          <Input SearchText={(text) => setSearchText(text)} />
          <UserProfile />
        </div>

        {searchText != '' && apiResponse && (
          <Response
            topResults={apiResponse?.topQuery?.results}
            songs={apiResponse?.songs?.results}
            albums={apiResponse?.albums?.results}
            artists={apiResponse?.artists?.results}
            playlists={apiResponse?.playlists?.results}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Search
