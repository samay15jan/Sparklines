import { FaCirclePlay } from 'react-icons/fa6'
import { songDetails } from '../../../../api/apiMethods'
import useRQGlobalState from '../../../../utils/useRQGlobalState'

const PlayIcon = ({ songs, id }) => {
  const [data, setData] = useRQGlobalState('playbackQueue', null)

  const handleClick = async () => {
    if (id) {
      const { data } = await songDetails(id)
      setData(data)
    }
    setData(songs)
  }

  return (
    <div>
      <FaCirclePlay
        size={55}
        color='#1ed760'
        onClick={handleClick}
        className='absolute ml-1 bottom-[-80px] drop-shadow-3xl bg-black rounded-full transition ease-in-out delay-50 hover:-translate-1 duration-100 hover:scale-110'
      />
    </div>
  )
}

export default PlayIcon
