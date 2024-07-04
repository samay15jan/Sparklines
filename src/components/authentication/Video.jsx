import React, { useEffect } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const VideoPlayer = styled.video`
  ${tw`lg:absolute right-0 h-screen pl-10 py-10 bg-[#ccced0] rounded-l-full`}
  &:focus {
    outline: none;
  }
`

const Video = () => {
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  return (
    <VideoPlayer
      autoPlay={true}
      loop={true}
      src='https://res.cloudinary.com/sparklines/video/upload/v1710374114/default/auth/video.mp4'
    ></VideoPlayer>
  )
}

export default Video
