import React, { useEffect, useState } from 'react'
import { updateFollowing } from '../../../../api/user'
import styled from 'styled-components'
import tw from 'twin.macro'
import useRQGlobalState from '../../../../utils/useRQGlobalState'

const Button = styled.div`
  ${tw`absolute hover:bg-white hover:text-black drop-shadow-md cursor-pointer ml-20 bottom-[-70px] 
  border-2 px-4 py-1 rounded-full font-bold text-sm duration-75 hover:scale-105 transition ease-in-out`}
`

const Following = ({ id, imageUrl }) => {
  const [isFollowing, setFollowing] = useState(false)
  const localData = localStorage.getItem('following')
  const [following, setNewFollowing] = useRQGlobalState(
    'following',
    JSON.parse(localData)
  )

  useEffect(() => {
    if (following?.data) {
      const isFollowed = following.data.some((artist) => artist.artistId === id)
      setFollowing(isFollowed)
      // Saving it locally
      localStorage.setItem('following', JSON.stringify(following?.data))
    }
  }, [following?.data, id])

  async function handleClick() {
    if (!id) return
    try {
      const data = { artistId: id, imageUrl: imageUrl }
      const response = await updateFollowing(
        data,
        isFollowing ? 'remove' : 'add'
      )
      if (response?.data) {
        setNewFollowing(response?.data)
        setFollowing(!isFollowing)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={isFollowing ? 'bg-white text-black' : ''}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}

export default Following
