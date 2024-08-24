import tw from 'twin.macro'
import styled from 'styled-components'
import { GoArrowDownRight } from 'react-icons/go'

const Container = styled.span`
  ${tw`relative z-50 shadow-xl font-bold text-3xl flex justify-center mt-[-10px] opacity-90 w-20 bg-black h-auto`}
  writing-mode: vertical-rl;
  font-family: 'Courier New', monospace;
`
const Text = styled.div`
  ${tw`flex`}
`

const Heading = () => {
  return (
    <Text>
      <p className='h-52'>EXPLORE NOW</p>
      <GoArrowDownRight size={40} />
    </Text>
  )
}

const RightBar = () => {
  const headings = Array.from({ length: 8 }, (v, i) => i)

  return (
    <Container>
      <div className='mr-6 flex gap-10 text-gray-200'>
        {headings.map((index) => (
          <Heading key={index} />
        ))}
      </div>
    </Container>
  )
}

export default RightBar
