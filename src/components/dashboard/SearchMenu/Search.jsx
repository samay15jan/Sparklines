import React, { lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import axios from 'axios'
import Response from './Response'
const Input = lazy(() => import('./Input'))

const Container = styled.div`${tw`w-screen justify-center`}`

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const [closeSearch, setCloseSearch] = useState(false)
    const [error, setError] = useState('')
    const [apiResponse, setApiResponse] = useState('')

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
            url: '/api/search',
            params: { query: searchText }
        }

        try {
            if(searchText == ''){
                return
            }
            const { data } = await axios.request(options)
            if (data.success) {
                const finalData = data.data
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