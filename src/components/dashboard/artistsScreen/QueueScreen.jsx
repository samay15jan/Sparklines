import React, { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { motion } from 'framer-motion'
import {
  DndContext,
  KeyboardSensor,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useRQGlobalState from '../../../utils/useRQGlobalState'

const QueueScreen = ({ queue, showQueue, updatePlayback, handleMenu }) => {
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const queueList = playbackDetails?.data
  if (!queueList[1]) return

  const artist = queueList[0]?.primaryArtists?.split(',').slice(0, 1)
  const artistId = queueList[0]?.primaryArtistsId
    ?.replaceAll(' ', '')
    ?.split(',')
    ?.slice(0, 1)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getTaskPos = (id) => queueList.findIndex((task) => task.id === id)

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setPlaybackDetails((queueList) => {
        const oldIndex = getTaskPos(active.id)
        const newIndex = getTaskPos(over.id)
        return arrayMove(queueList, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className='w-full'>
      <div className='flex w-full  justify-between px-4 py-5 font-semibold text-md'>
        <h1 className='text-center'>Queue</h1>
        <button
          className='opacity-60 hover:opacity-100 font-bold'
          onClick={() => showQueue(!queue)}
        >
          <MdClose size={25} />
        </button>
      </div>
      <div className='py-2'>
        <h1 className='text-md font-semibold my-2 ml-4'>Now Playing</h1>
        <QueueList
          playing
          queueData={queueList}
          artists={queueList[0]?.primaryArtists}
          artistsIds={queueList[0]?.primaryArtistsId}
          image={queueList[0].image[1]?.link}
          id={queueList[0]?.id}
          name={queueList[0]?.name}
          handleMenu={handleMenu}
        />
      </div>
      <h1 className='flex text-md font-semibold my-2 ml-4'>
        Next from:
        <h1
          className='ml-1 hover:underline cursor-pointer'
          onClick={() => handleMenu('artist', artistId)}
        >
          {artist}
        </h1>
      </h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={queueList}
          strategy={verticalListSortingStrategy}
        >
          {queueList?.slice(1)?.map((song) => (
            <div className='my-1 '>
              <QueueList
                key={song?.id}
                queueData={queueList}
                artists={song?.primaryArtists}
                artistsIds={song?.primaryArtistsId}
                image={song?.image[1]?.link}
                id={song?.id}
                name={song?.name}
                handleMenu={handleMenu}
              />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

const QueueList = ({
  playing,
  queueData,
  artists,
  artistsIds,
  image,
  id,
  name,
  handleMenu,
}) => {
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const [ShowDeleteNextQueue, SetDeleteNextQueue] = useState(false)
  const artist = artists?.split(',').slice(0, 1)
  const artistId = artistsIds?.replaceAll(' ', '').split(',')
  const nextQueueRef = useRef(null)

  // Swipe gestures (Works with mouse) (Touch not tested)
  useEffect(() => {
    let mouseEnter = null,
      mouseMove = null
    const minSwipeDistance = 50

    const handleMouseEnter = (event) => {
      if (event.clientX) {
        mouseEnter = event.clientX
      } else mouseEnter = event.touches[0].clientX
    }

    const handleMouseMove = (event) => {
      if (event.clientX) {
        mouseMove = event.clientX
      } else mouseMove = event.touches[0].clientX
    }

    const handleMouseLeave = () => {
      if (!mouseEnter || !mouseMove) return
      if (mouseEnter == mouseMove) return
      const distance = mouseEnter - mouseMove
      const isLeftSwipe = distance > minSwipeDistance
      if (isLeftSwipe) SetDeleteNextQueue(true)
    }

    if (nextQueueRef.current) {
      nextQueueRef.current.addEventListener('mousedown', handleMouseEnter)
      nextQueueRef.current.addEventListener('mousemove', handleMouseMove)
      nextQueueRef.current.addEventListener('mouseup', handleMouseLeave)
      nextQueueRef.current.addEventListener('touchstart', handleMouseEnter)
      nextQueueRef.current.addEventListener('touchmove', handleMouseMove)
      nextQueueRef.current.addEventListener('touchend', handleMouseLeave)
    }

    return () => {
      if (nextQueueRef.current) {
        nextQueueRef.current.removeEventListener('mousedown', handleMouseEnter)
        nextQueueRef.current.removeEventListener('mousemove', handleMouseMove)
        nextQueueRef.current.removeEventListener('mouseup', handleMouseLeave)
        nextQueueRef.current.removeEventListener('touchstart', handleMouseEnter)
        nextQueueRef.current.removeEventListener('touchmove', handleMouseMove)
        nextQueueRef.current.removeEventListener('touchend', handleMouseLeave)
      }
    }
  }, [])

  // Remove Next Queue
  function removeQueue() {
    const newQueryData = queueData.slice(0, 1).concat(queueData.slice(2))
    setPlaybackDetails(newQueryData)
  }

  function PlaySong() {
    const newQueryData = queueData.slice(1)
    updatePlayback(newQueryData)
  }

  function trimTextToLetters(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    } else {
      return text.slice(0, maxLength) + '...'
    }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: {
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='relative rounded-lg overflow-x-hidden '
    >
      <div className='absolute z-40 right-2 cursor-pointer'>
        {ShowDeleteNextQueue ? (
          <MdDeleteOutline
            onClick={removeQueue}
            className='relative bg-red-700 transition-opacity hover:bg-opacity-80 w-12 h-16 p-3 rounded-md'
            size={25}
          />
        ) : (
          <BsThreeDotsVertical
            className='relative w-12 h-16 p-3 rounded-md'
            onClick={() => SetDeleteNextQueue(true)}
            size={25}
          />
        )}
      </div>
      <div
        ref={nextQueueRef}
        className='relative flex text-sm hover:bg-[#353535] m-2 mt-0 p-2 rounded-md cursor-pointer select-none'
      >
        {!ShowDeleteNextQueue && !playing && (
          <FaPlay onClick={PlaySong} className='p-2 pt-3 mt-1 mr-2' size={35} />
        )}
        <img className='max-w-12 max-h-12 mr-3 rounded-sm' src={image} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='mt-1'
        >
          <h1
            className={
              playing
                ? 'ml-1 font-bold text-[14px] text-[#19a44b] hover:underline'
                : 'ml-1 font-bold text-[14px] hover:underline'
            }
            onClick={() => handleMenu('track', id)}
          >
            {trimTextToLetters(name, 25)}
          </h1>
          <h1 className='flex text-sm opacity-80'>
            {artist.map((name, index) => (
              <h1
                className='ml-1 hover:underline cursor-pointer'
                key={index}
                onClick={() => handleMenu('artist', artistId[index])}
              >
                {name}
              </h1>
            ))}
          </h1>
        </motion.div>
      </div>
    </div>
  )
}

export { QueueScreen, QueueList }
