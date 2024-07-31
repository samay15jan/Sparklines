import React, { lazy } from 'react'
import { FaRegClock } from 'react-icons/fa6'
const Song = lazy(() => import('./Song'))

const SongList = ({
  id,
  songs,
  name,
  artistName,
  time,
  releaseDate,
  copyright,
  explicit,
  type,
  menu,
}) => {
  return (
    <div className={menu === 'search' ? 'mt-10' : 'mt-28'}>
      {type != 'artist' && (
        <>
          <div
            className={
              menu === 'search'
                ? 'mx-5 opacity-80 text-sm flex justify-between'
                : 'ml-12 mr-20 opacity-80 text-sm flex justify-between'
            }
          >
            <div className='flex gap-6'>
              <i>#</i>
              <h1>Title</h1>
            </div>
            {menu === 'search' && (
              <div className='ml-40'>
                <h1>Album</h1>
              </div>
            )}
            <h1 className={menu === 'search' && 'mr-7'}>
              <FaRegClock size={15} />
            </h1>
          </div>
          <hr
            className={
              menu === 'search'
                ? 'opacity-20 my-2'
                : 'ml-8 mr-16 opacity-20 my-2'
            }
          />
        </>
      )}
      {songs ? (
        <div>
          {type === 'artist' && (
            <h1 className='ml-5 mb-5 font-bold text-2xl'>Popular</h1>
          )}
          {songs &&
            songs.map((songData, index) => (
              <div>
                <Song
                  menu={menu}
                  songData={songData}
                  index={index}
                  type={type}
                />
              </div>
            ))}
          {releaseDate || copyright && (
            <div className='mt-10 ml-5'>
              {releaseDate && (
                <div className='text-sm font-medium opacity-80'>
                  {releaseDate || ''}
                </div>
              )}
              {copyright && (
                <div className='text-[10px] font-medium opacity-80'>
                  {copyright || ''}
                </div>
              )}
              {copyright && (
                <div className='text-[10px] font-medium opacity-80'>
                  {copyright || ''}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <Song
            id={id}
            index={0}
            name={name}
            artistName={artistName}
            time={time}
            explicit={explicit}
          />
          <div className='mt-10 ml-5'>
            <div className='text-sm font-medium opacity-80'>
              {releaseDate || ''}
            </div>
            <div className='text-[10px] font-medium opacity-80'>
              {copyright || ''}
            </div>
            <div className='text-[10px] font-medium opacity-80'>
              {copyright || ''}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SongList
