import styled from 'styled-components'
import tw from 'twin.macro'

const Iframe = styled.iframe`
  ${tw`w-full h-screen`}
`

const Docs = () => {
  return <Iframe src='http://localhost:5000/'></Iframe>
}

export default Docs
