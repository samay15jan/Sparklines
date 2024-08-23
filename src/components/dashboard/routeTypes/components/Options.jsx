import React, { useEffect, useState } from 'react'
import { updateOptions } from '../../../../api/user'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa6'
import {
  MdPlaylistAdd,
  MdOutlinePlaylistRemove,
  MdPlaylistAddCheck,
} from 'react-icons/md'
import { GrClose } from 'react-icons/gr'
import { AnimatePresence } from 'framer-motion'
import { MdOutlineHourglassEmpty } from 'react-icons/md'

const Container = styled.div`
  ${tw`mt-[1px]`}
`

const FollowingButton = styled.div`
  ${tw`absolute ml-20 bottom-[-70px] border-2 px-4 py-1 hover:bg-white hover:text-black drop-shadow-md cursor-pointer  
    rounded-full font-bold text-sm duration-75 hover:scale-105 transition ease-in-out`}
`

const LikedButton = styled.div`
  ${tw`drop-shadow-md cursor-pointer  
    rounded-full font-bold text-sm duration-75 hover:scale-105 transition ease-in-out`}
`
const PlaylistButton = styled.div`
  ${tw`relative z-50 drop-shadow-md cursor-pointer  
    rounded-full font-bold text-sm `}
`

const Options = ({
  type,
  id,
  image,
  name,
  artist,
  artistId,
  album,
  albumId,
  duration,
  style,
  autoUpdate,
}) => {
  const [isSelected, setSelection] = useState(false)
  const localData = localStorage.getItem(type)
  const [data, setNewData] = useRQGlobalState(type, JSON.parse(localData))
  const [currentSong] = useRQGlobalState('currentSong', null)
  const [playlistName, setPlaylistName] = useState(null)

  const songBody = {
    id: id,
    image: image,
    name: name,
    artist: artist,
    artistId: artistId,
    album: album,
    albumId: albumId,
    duration: duration,
  }

  const playlistBody = {
    image: image,
    name: playlistName,
    songs: songBody,
  }

  const api = [
    {
      type: 'following',
      endpoint: 'updateFollowing',
      body: {
        id: id,
        name: name,
        image: image,
      },
    },
    {
      type: 'liked',
      endpoint: 'updateLikedMusic',
      body: songBody,
    },
    {
      type: 'recentlyPlayed',
      endpoint: 'updateRecentlyPlayed',
      body: songBody,
    },
    {
      type: 'customPlaylists',
      endpoint: {
        managePlaylists: 'managePlaylists',
        updateSong: 'updatePlaylistSongs',
      },
      playlistBody: playlistBody,
    },
  ]

  const selectedBody = api.find((item) => item.type === type)
  const { body, endpoint } = selectedBody

  useEffect(() => {
    if (data?.data) {
      const isAvailable = data.data.some((artist) => artist.id === id)
      if (!autoUpdate) {
        setSelection(isAvailable)
      }
      // Saving it locally
      localStorage.setItem(type, JSON.stringify(data?.data))
    }
  }, [data?.data, id])

  useEffect(() => {
    if (autoUpdate) {
      setSelection(false)
      handleClick()
    }
  }, [id, currentSong?.data?.id])

  async function handleClick() {
    if (!id) return
    try {
      const response = await updateOptions(
        body,
        isSelected ? 'remove' : 'add',
        `/api/user/${endpoint}`
      )
      if (response?.data) {
        setNewData(response?.data)
        if (!autoUpdate) {
          setSelection(!isSelected)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handlePlaylists() {
    if (!id) return
    try {
      const response = await updateOptions(
        playlistBody,
        'add',
        `/api/user/${endpoint.managePlaylists}`
      )
      setNewData(response?.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function updatePlaylistsSongs(name) {
    if (!id) return
    setPlaylistName(name)
    try {
      const response = await updateOptions(
        playlistBody,
        isSelected ? 'remove' : 'add',
        `/api/user/${endpoint.updateSong}`
      )
      setNewData(response?.data)
      if (!autoUpdate) {
        setSelection(!isSelected)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {type === 'following' && (
        <FollowingButton
          onClick={handleClick}
          className={isSelected ? 'bg-white text-black' : ''}
        >
          {isSelected ? 'Following' : 'Follow'}
        </FollowingButton>
      )}

      {type === 'liked' && (
        <LikedButton
          className={style ? style : 'mt-2 mr-5'}
          onClick={handleClick}
        >
          {isSelected ? (
            <FaHeart style={{ color: '#1db954' }} size={style ? 20 : 25} />
          ) : (
            <FaRegHeart size={style ? 20 : 25} />
          )}
        </LikedButton>
      )}

      {type === 'customPlaylists' && (
        <PlaylistButton className={style ? style : 'mt-2 mr-5'}>
          <PlaylistMenu
            savePlaylist={handlePlaylists}
            addSongs={(name) => updatePlaylistsSongs(name)}
            setName={(name) => setPlaylistName(name)}
            data={data?.data}
          />
        </PlaylistButton>
      )}
    </>
  )
}

const PlaylistMenu = ({ savePlaylist, addSongs, setName, data }) => {
  const [menu, showMenu] = useState(false)
  const [createPlaylist, showCreatePlaylist] = useState(false)

  function handleClose() {
    showMenu(!menu)
    showCreatePlaylist(false)
  }

  return (
    <AnimatePresence>
      <Container>
        {createPlaylist && (
          <div className='flex absolute bottom-48 right-0 z-50 text-bold text-md drop-shadow-2xl p-1 w-56 h-10 overflow-y-scroll rounded-lg bg-[#282828]'>
            <input
              onChange={(e) => setName(e.target.value)}
              autoFocus
              placeholder='Enter playlist name'
              type='text'
              className='p-1 bg-[#282828] w-48 h-auto border-2 border-white border-opacity-60 rounded-md'
            />
            <GrClose
              size={25}
              className='p-1 mt-1'
              onClick={() => showCreatePlaylist(!createPlaylist)}
            />
          </div>
        )}
        {menu && (
          <div className='absolute bottom-10 z-20 text-bold text-md drop-shadow-2xl right-0 p-2 w-56 h-40 overflow-y-scroll rounded-lg bg-[#202020]'>
            <div
              onClick={
                createPlaylist
                  ? () => savePlaylist(true)
                  : () => showCreatePlaylist(!createPlaylist)
              }
              className='hover:bg-[#404040] rounded-t-sm flex p-1 gap-2 mb-2 border-b-2 border-opacity-20 border-white'
            >
              <FaPlus size={20} />
              {createPlaylist ? 'Save Playlist' : 'Create New Playlist'}
            </div>
            {data ? (
              data.map((playlist) => (
                <div
                  key={playlist?._id}
                  onClick={() => addSongs(playlist?.name)}
                  className='flex gap-2 p-1 hover:bg-[#404040]'
                >
                  <img src={playlist?.image} className='w-10 h-10 rounded-lg' />
                  <h1 className='mt-2'>{playlist?.name}</h1>
                </div>
              ))
            ) : (
              <div className='opacity-60 justify-center w-auto flex flex-col p-8 text-center'>
                <MdOutlineHourglassEmpty
                  size={25}
                  className='animate-spin w-auto flex justify-center'
                />
                Empty
              </div>
            )}
          </div>
        )}
        <div onClick={handleClose}>
          {menu ? (
            <GrClose
              className='right-0 m-1 mt-1 opacity-80 p-[1px]'
              size={25}
            />
          ) : (
            <MdPlaylistAdd size={30} />
          )}
        </div>
      </Container>
    </AnimatePresence>
  )
}

export default Options
