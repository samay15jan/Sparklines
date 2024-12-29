import { useEffect, useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { FaPlay, FaPause } from 'react-icons/fa6'
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

const QueueScreen = ({ showMenu, handleMenu, isPublic }) => {
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const queueList = playbackDetails?.data
  if (!queueList || !queueList[1]) return

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

  const getTaskPos = (id) => queueList?.findIndex((task) => task.id === id)

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
      {!isPublic && (
        <div className='flex w-full justify-between px-4 py-5 font-semibold text-md'>
          <h1 className='text-center'>Queue</h1>
          <button
            className='opacity-60 hover:opacity-100 font-bold'
            onClick={() => showMenu('nowPlaying')}
          >
            <MdClose size={25} />
          </button>
        </div>
      )}
      {!isPublic && (
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
      )}

      <h1 className='relative z-2 flex text-md font-semibold my-2 ml-4'>
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
          <div className={isPublic && 'max-h-[50vh] overflow-y-scroll'}>
            {queueList?.slice(1)?.map((song) => (
              <div className='my-1' key={song?.id}>
                <QueueList
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
          </div>
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
  const [playerRef] = useRQGlobalState('playerRef', null)
  const [playbackDetails, setPlaybackDetails] =
    useRQGlobalState('playbackQueue')
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id })
  const [showPlay, setPlay] = useState(false)
  const artist = artists?.split(',').slice(0, 1)
  const artistId = artistsIds?.replaceAll(' ', '').split(',')
  const nextQueueRef = useRef(null)

  // Swipe gestures (Works with mouse) (Touch not tested)
  useEffect(() => {
    let mouseEnter = null,
      mouseMove = null
    const minSwipeDistance = 100

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
      if (isLeftSwipe) removeQueue()
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
    const newQueryData = queueData.filter((task) => task.id !== id)
    setPlaybackDetails(newQueryData)
  }

  // Play Song
  function playSong() {
    const filteredSong = queueData.filter((task) => task.id === id)
    if (filteredSong.length > 0) {
      const newQueueData = [
        filteredSong[0],
        ...queueData.filter((task) => task.id !== id),
      ]

      setPlaybackDetails(newQueueData)
    }
  }

  // Pause Song
  function pauseSong() {
    if (!playerRef?.data) return
    if (playerRef.data.paused) {
      playerRef.data.play()
      setPlay(true)
    } else {
      playerRef.data.pause()
      setPlay(false)
    }
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
      ref={nextQueueRef}
      style={style}
      className='relative rounded-lg overflow-x-hidden'
    >
      <MdDeleteOutline
        onClick={removeQueue}
        className='absolute hover:text-red-500 cursor-pointer z-20 right-2 text-white w-14 h-16 p-4'
        size={25}
      />
      <div className='absolute hover:text-gray-500 cursor-pointer z-20 left-0 text-white w-14 h-16 p-2 ml-1'>
        {!playing ? (
          <FaPlay onClick={playSong} className='p-2 pt-3 mt-1 mr-2' size={35} />
        ) : (
          <FaPause
            onClick={pauseSong}
            className={
              showPlay
                ? 'p-2 pt-3 mt-1 mr-2'
                : 'p-2 pt-3 mt-1 mr-2 animate-pulse'
            }
            size={35}
          />
        )}
      </div>
      <div ref={setNodeRef} {...attributes} {...listeners}>
        <div className='relative flex text-sm hover:bg-[#353535] m-2 mt-0 p-2 rounded-md cursor-pointer select-none'>
          <img className='max-w-12 max-h-12 ml-8 mr-3 rounded-sm' src={image} />
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
    </div>
  )
}

export { QueueScreen, QueueList }
