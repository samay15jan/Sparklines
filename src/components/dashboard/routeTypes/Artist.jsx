import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  artistDetails,
  artistSongs,
  artistAlbums,
  recommendedSongs,
  searchSpecific,
} from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))
const Header = lazy(() => import('./components/Header'))
const RelatedContent = lazy(() => import('./components/RelatedContent'))
const Artists = lazy(() => import('../searchMenu/Artists'))

const artist = () => {
  const [data, setData] = useRQGlobalState('artistDetails', [
    { id: 1, name: 'details', data: null },
    { id: 2, name: 'songs', data: { popular: null, latest: null }, page: 1, isLastPage: false },
    { id: 3, name: 'albums', data: { popular: null, latest: null }, page: 1, isLastPage: false  },
    { id: 4, name: 'playlists', data: null },
    { id: 5, name: 'artists', data: null },
    { id: 5, name: 'recommendations', data: null },
  ])
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  let detailsData = data?.data?.find((category) => category.name === 'details')
  let songsData = data?.data?.find((category) => category.name === 'songs')
  let albumsData = data?.data?.find((category) => category.name === 'albums')
  let playlistsData = data?.data?.find(
    (category) => category.name === 'playlists'
  )
  let artistsData = data?.data?.find((category) => category.name === 'artists')
  let recommendationsData = data?.data?.find(
    (category) => category.name === 'recommendations'
  )

  const updateCategory = (name, newData) => {
    setData((prevState) =>
      prevState.map((category) =>
        category.name === name ? { ...category, ...newData } : category
      )
    )
  }

  useEffect(() => {
    getArtistData()
  }, [id])

  async function getArtistData() {
    if (!id) return
    const artistResponse = await artistDetails(id)
    const artistId = artistResponse?.data?.id
    const artistName = artistResponse?.data?.name.replace(' ', '+')
    let songId
    updateCategory('details', { data: artistResponse?.data })
    if (artistId) {
      const songsResponsePopular = await artistSongs(artistId)
      const songsResponseLatest = await artistSongs(artistId, 1, 'latest')
      const albumsResponsePopular = await artistAlbums(artistId)
      const albumsResponseLatest = await artistAlbums(artistId, 1, 'latest')
      songId = songsResponseLatest?.data?.results[0]?.id
      updateCategory('songs', {
        data: {
          popular: songsResponsePopular?.data,
          latest: songsResponseLatest?.data,
        },
      })
      updateCategory('albums', {
        data: {
          popular: albumsResponsePopular?.data,
          latest: albumsResponseLatest?.data,
        },
      })
    }
    if (artistName) {
      const playlistsResponse = await searchSpecific('playlists', artistName)
      const artistsResponse = await searchSpecific('artists', artistName)
      updateCategory('playlists', { data: playlistsResponse?.data })
      updateCategory('artists', { data: artistsResponse?.data })
    }
    if (songId) {
      const recommendedResponse = await recommendedSongs(songId)
      updateCategory('recommendations', { data: recommendedResponse?.data })
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key='artist'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={
            dominantColor && {
              backgroundColor: `rgba(${dominantColor}, 0.7)`,
              boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
            }
          }
        >
          {detailsData?.data && (
            <div className='relative pt-20 ml-5'>
              <Header
                data={detailsData?.data}
                image={detailsData?.data?.image[2]?.link}
                name={detailsData?.data?.name}
                followerCount={detailsData?.data?.followerCount}
                verfied={detailsData?.data?.isVerified}
                dominantColor={(color) => setDominantColor(color)}
              />
              <PlayIcon />
            </div>
          )}
        </div>

        {/* Popular Songs */}
        {songsData?.data?.popular && (
          <SongList
            songs={songsData?.data?.popular?.results?.slice(0, 5)}
            type='artist'
          />
        )}

        {/* Latest Songs */}
        {songsData?.data?.latest && (
          <RelatedContent
            relatedSongs={songsData?.data?.latest?.results}
            heading='Singles and EPs'
          />
        )}

        {/* Latest Albums */}
        {albumsData?.data?.latest && (
          <RelatedContent
            relatedSongs={albumsData?.data?.latest?.results}
            heading={`Featuring ${detailsData?.data?.name}`}
          />
        )}

        {/* Popular Albums */}
        {albumsData?.data && (
          <RelatedContent
            relatedSongs={albumsData?.data?.popular?.results}
            heading='Appears On'
          />
        )}

        {/* Related Artists */}
        {artistsData?.data && (
          <>
            <h1 className='mt-5 ml-5  text-2xl font-bold'>Fans also like</h1>
            <Artists
              isArtistPage={true}
              data={artistsData?.data?.results?.slice(0, 4)}
            />
          </>
        )}

        {/* Recommended Songs */}
        {recommendationsData?.data && (
          <RelatedContent
            relatedSongs={recommendationsData?.data}
            heading='Must Listen Songs'
          />
        )}

        {/* Discovered on */}
        {playlistsData?.data && (
          <RelatedContent
            relatedSongs={playlistsData?.data?.results}
            heading='Discovered On'
          />
        )}

        <div className='mb-2 flex justify-center w-full text-lg font-bold opacity-60 font-sans'>-x-x-x-</div>
      </motion.div>
    </AnimatePresence>
  )
}

export default artist
