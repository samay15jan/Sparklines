import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.button`
  ${tw`w-32 rounded-full border-2 flex gap-2 font-bold justify-center`}
`

const LogoContainer = ({ text, image, whiteBg, Icon, navigation }) => {
  function handleNavigation() {
    if (text === 'Login') {
      navigation('/auth')
    }
  }

  return (
    <Container
      className={
        (whiteBg && 'bg-black text-white border-black hover:text-black hover:bg-white transition-colors duration-300') ||
        (text === 'Sparklines' && 'bg-[#dad4f1]')
      }
      onClick={handleNavigation}
    >
      {image && <img src={image} className='w-10 pointer-events-none ' />}
      <div className='my-3 lg:mt-3 ml-1'>{text}</div>
      {Icon && <Icon size={25} className='mt-3' />}
    </Container>
  )
}

export default LogoContainer
