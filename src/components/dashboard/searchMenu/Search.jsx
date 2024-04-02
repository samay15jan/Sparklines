import React, { lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import axios from 'axios'
import Response from './Response'
const Input = lazy(() => import('./Input'))

const Container = styled.div`${tw`text-white w-screen justify-center`}`

const Search = ({ open }) => {
    const [searchText, setSearchText] = useState('')
    const [closeSearch, setCloseSearch] = useState(false)
    const [error, setError] = useState('')
    const [apiResponse, setApiResponse] = useState('')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        open(closeSearch)
    }, [closeSearch])

    useEffect(() => {
        searchAPI()
    }, [searchText])

    const handleInput = (inputText) => {
        setSearchText(inputText)
        searchAPI()
    }

    const searchAPI = async () => {
        const options = {
            method: 'GET',
            url: '/api/search/all',
            params: { query: searchText },
            headers: {
              'userid': `${userId}`,
              'Content-Type': 'application/json'
            }
        }

        try {
            if(searchText == ''){
                return
            }
            const { data } = await axios.request(options)
            if (data && data.status === 'SUCCESS') {
                setApiResponse(data.data)
            } else {
                throw new Error('Unable to fullfill request')
            }
        } catch (error) {
            console.error(error)
            setError('An Error Occured')
        }
    }
    return (
        <Container onClick={() => setCloseSearch(!closeSearch)}>
            <Input
                close={closeSearch}
                SearchText={handleInput}
            />
            {searchText != '' && apiResponse && closeSearch &&
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