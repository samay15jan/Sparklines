import styled from 'styled-components'
import tw from 'twin.macro'
import { useLocation } from 'react-router-dom'

const SubContainer = styled.div`
  ${tw`grid grid-cols-1 p-2 rounded-lg opacity-20`}
`
const ImageSkeleton = styled.div`
  ${tw`h-96 rounded-lg bg-white animate-pulse`}
`
const HeadingSkeleton = styled.div`
  ${tw`mb-4 w-32 h-6 bg-white rounded-lg animate-pulse`}
`
const TitleSkeleton = styled.div`
  ${tw`ml-2 mb-2 mt-4 w-32 h-8 bg-white rounded-lg animate-pulse`}
`
const SubHeadingSkeleton = styled.div`
  ${tw`ml-2 mb-4 w-60 h-4 bg-white rounded-lg animate-pulse`}
`
const IconSkeleton = styled.div`
  ${tw`mr-2 mt-4 w-8 h-8 bg-white rounded-lg animate-pulse`}
`

const Skeleton = () => {
  const location = useLocation()
  let currentPath = location.pathname
  let isPublic = currentPath.startsWith('/public/')

  return (
    <div className={isPublic ? 'm-2 rounded-lg grid col-span-4 overflow-scroll max-h-[50vh] text-sm font-bold' : 'bg-[#0f0f0f] m-2 rounded-lg grid col-span-4 overflow-scroll h-auto text-sm font-bold'}>
      <SubContainer>
        <HeadingSkeleton />
        <ImageSkeleton />
        <div className='flex bg-[#242424] justify-between'>
          <div>
            <TitleSkeleton />
            <SubHeadingSkeleton />
          </div>
          <IconSkeleton />
        </div>
        <div className='relative my-5 bg-[#242424] rounded-lg '>
          <div className='relative rounded-t-lg inset-0 w-full h-72 object-cover object-center opacity-70 bg-white animate-pulse' />
          <div className='ml-4'>
            <div className='w-32 h-8 my-3 bg-white rounded-lg animate-pulse' />
            <SubHeadingSkeleton />
            <SubHeadingSkeleton />
          </div>
        </div>
        <div className='relative bg-[#242424] rounded-lg'>
          <div className='m-4 my-6 w-20 h-6 bg-white rounded-lg animate-pulse ' />
          <div className='m-4 my-6'>
            <div className='w-32 my-2 h-4 bg-white rounded-lg animate-pulse' />
            <SubHeadingSkeleton />
          </div>
          <div className='m-4 my-6'>
            <div className='w-32 my-2 h-4 bg-white rounded-lg animate-pulse' />
            <SubHeadingSkeleton />
          </div>
          <div className='m-4 my-6'>
            <div className='w-32 my-2 h-4 bg-white rounded-lg animate-pulse' />
            <SubHeadingSkeleton />
          </div>
        </div>
      </SubContainer>
    </div>
  )
}

export default Skeleton
