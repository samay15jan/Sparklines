import React, { useEffect } from 'react'
import ColorThief from 'colorthief'

const Header = ({
  data,
  image,
  type,
  name,
  artistName,
  year,
  time,
  songCount,
  followerCount,
  dominantColor,
}) => {
  useEffect(() => {
    const newImage = new Image()
    newImage.crossOrigin = 'Anonymous'
    newImage.src = image
    newImage.onload = () => {
      const colorThief = new ColorThief()
      const color = colorThief.getPalette(newImage)
      const number = Math.floor(Math.random() * color.length)
      dominantColor(color[number])
    }
  }, [image])

  function trimTextToLetters(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.slice(0, maxLength) + '...'
    }
  }

  return (
    <div>
      {data && (
        <div className='flex'>
          {image && (
            <img
              className={
                type
                  ? 'drop-shadow-md w-48 h-48 rounded-lg'
                  : 'drop-shadow-md w-48 h-48 rounded-full'
              }
              src={image}
              style={{ boxShadow: `0 0 50px 10px rgba(0,0,0, 0.4)` }}
            />
          )}
          <div className='relative z-1 ml-6 mt-16'>
            {type && (
              <div className='text-sm font-medium my-1 drop-shadow-md'>
                {type}
              </div>
            )}
            {name && (
              <div className='text-6xl font-extrabold drop-shadow-2xl'>
                {trimTextToLetters(name, 16)}
              </div>
            )}
            <div className='flex my-5'>
              {artistName && (
                <div className='text-sm font-bold drop-shadow-xl ml-1 cursor-pointer'>
                  {trimTextToLetters(artistName, 40)}
                </div>
              )}
              {year && (
                <div className='ml-1cd  text-sm font-medium drop-shadow-xl ml-1'>
                  {' '}
                  &#128900; {year}
                </div>
              )}
              {time && (
                <div className='ml-1 text-sm font-medium'>
                  {' '}
                  &#128900; {time}
                </div>
              )}
              {songCount && (
                <div className='ml-1 text-sm font-medium'>
                  {' '}
                  &#128900; {songCount} Songs
                </div>
              )}
              {followerCount && (
                <div className='ml-1 text-md font-medium'>
                  {followerCount} monthly listeners
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
