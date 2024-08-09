import React, { useEffect, useState } from 'react'
import { updateOptions } from '../../../../api/user'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../../utils/useRQGlobalState'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

const FollowingButton = styled.div`
  ${tw`absolute ml-20 bottom-[-70px] border-2 px-4 py-1 hover:bg-white hover:text-black drop-shadow-md cursor-pointer  
    rounded-full font-bold text-sm duration-75 hover:scale-105 transition ease-in-out`}
`

const LikedButton = styled.div`
  ${tw`drop-shadow-md cursor-pointer  
    rounded-full font-bold text-sm duration-75 hover:scale-105 transition ease-in-out`}
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
  style
}) => {
  const [isSelected, setSelection] = useState(false)
  const menu = type === 'following' ? 'following' : 'liked'
  const localData = localStorage.getItem(menu)
  const [data, setNewData] = useRQGlobalState(menu, JSON.parse(localData))

  useEffect(() => {
    if (data?.data) {
      const isAvailable = data.data.some((artist) => artist.id === id)
      setSelection(isAvailable)
      // Saving it locally
      localStorage.setItem(menu, JSON.stringify(data?.data))
    }
  }, [data?.data, id])

  async function handleClick() {
    if (!id) return
    try {
      const body =
        menu === 'following'
          ? { id: id, image: image }
          : {
              id: id,
              image: image,
              name: name,
              artist: artist,
              artistId: artistId,
              album: album,
              albumId: albumId,
              duration: duration,
            }
      const endpoint =
        menu === 'following' ? 'updateFollowing' : 'updateLikedMusic'
      const response = await updateOptions(
        body,
        isSelected ? 'remove' : 'add',
        `/api/user/${endpoint}`
      )
      if (response?.data) {
        setNewData(response?.data)
        setSelection(!isSelected)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {menu === 'following' && (
        <FollowingButton
          onClick={handleClick}
          className={isSelected ? 'bg-white text-black' : ''}
        >
          {isSelected ? 'Following' : 'Follow'}
        </FollowingButton>
      )}

      {menu === 'liked' && (
        <LikedButton className={style ? style : 'mt-2 mr-5'} onClick={handleClick}>
          {isSelected ? (
            <FaHeart style={{ color: '#1db954' }} size={style ? 20 : 25} />
          ) : (
            <FaRegHeart size={style ? 20 : 25} />
          )}
        </LikedButton>
      )}
    </>
  )
}

export default Options
