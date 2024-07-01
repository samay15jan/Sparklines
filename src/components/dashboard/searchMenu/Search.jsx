import React, { lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import Response from './Response'
import { searchAll } from '../../../utils/apiMethods'
const Input = lazy(() => import('./Input'))

const Container = styled.div`${tw`bg-[#0f0f0f] overflow-y-auto h-auto my-2 mx-1 rounded-lg col-span-8 p-5`}`

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [apiResponse, setApiResponse] = useState('')

  useEffect(() => {
    getData()
  }, [searchText])

  async function getData() {
    const response = await searchAll(searchText)
    setApiResponse(response)
  }

  return (
    <Container>
      <Input
        SearchText={() => setSearchText(inputText)}
      />
      {searchText != '' && apiResponse &&
        <Response
          topResults={apiResponse?.topQuery?.results}
          songs={apiResponse?.songs?.results}
          albums={apiResponse?.albums?.results}
          artists={apiResponse?.artists?.results}
          playlists={apiResponse?.playlists?.results}
        />
      }
    </Container>
  )
}

export default Search