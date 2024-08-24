import styled from 'styled-components'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`p-2 cursor-pointer grid grid-flow-col overflow-x-auto text-sm font-bold`}
`
const SubContainer = styled.div`
  ${tw`grid grid-cols-1 p-5 w-48 rounded-xl opacity-20`}
  transition: background 0.3s ease;
  &:hover {
    background: #2a2a2a;
  }
`
const ImageSkeleton = styled.div`
  ${tw`w-36 h-36 rounded-xl bg-white animate-pulse`}
`
const TitleSkeleton = styled.div`
  ${tw`w-32 h-4 mx-1 mt-2 rounded-md bg-white animate-pulse`}
`
const SubTitileSkeleton = styled.div`
  ${tw`w-28 h-4 mx-1 mt-2 rounded-md bg-white animate-pulse`}
`

const Skeleton = () => {
  const fallback = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Container>
      {fallback.map((type) => (
        <SubContainer key={type}>
          <ImageSkeleton />
          <TitleSkeleton />
          <SubTitileSkeleton />
        </SubContainer>
      ))}
    </Container>
  )
}

export default Skeleton
