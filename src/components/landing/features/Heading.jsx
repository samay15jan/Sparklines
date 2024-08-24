import tw from 'twin.macro'
import styled from 'styled-components'
import { RiLoginCircleFill } from 'react-icons/ri'

const HeadingText = styled.span`
  ${tw`drop-shadow-xl text-5xl max-w-72 font-black opacity-80`}
  font-family: 'Courier New', monospace;
  font-weight: 1000;
  text-shadow:
    2px 2px,
    2px 2px,
    2px 2px;
  letter-spacing: 1px;
`

const Heading = () => {
  return (
    <div>
      <div className='flex mb-5'>
        <div className='mt-3 w-12 h-12 rounded-full bg-black bg-yellow-400' />
        <div className='w-6 h-12 rounded-r-full mt-3 bg-[#dad4f1]' />
        <div className='w-6 h-12 rounded-r-full mt-3 bg-[#dad4f1]' />
      </div>
      <HeadingText>Improve your music taste</HeadingText>
      <div className='flex jusitfy-center gap-2 w-44 border-2 border-black rounded-full text-md font-bold p-2 my-5'>
        <div className='mt-1 ml-3'>START NOW</div>
        <RiLoginCircleFill size={30} />
      </div>
    </div>
  )
}

export default Heading
