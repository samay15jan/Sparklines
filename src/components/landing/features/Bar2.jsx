import { FaNodeJs } from 'react-icons/fa6'
import { RiReactjsLine } from 'react-icons/ri'
import { SiTailwindcss, SiMongodb } from 'react-icons/si'

const Bar2 = () => {
  return (
    <div className='flex text-center text-sm font-bold text-white w-96 mb-6 px-5 h-16 rounded-full bg-[#020f14]'>
      <RiReactjsLine
        size={55}
        className='mt-1 hover:animate-spin text-[#17b2b3]'
      />
      <SiMongodb
        size={55}
        className='mt-1 ml-1 hover:animate-spin text-[#00694a]'
      />
      <div className='mx-5 mt-3'>
        Discover Your Sound with Cutting-Edge Technologies
      </div>
      <FaNodeJs
        size={45}
        className='mt-2 mr-2 hover:animate-spin text-[#00694a]'
      />
      <SiTailwindcss
        size={50}
        className='mt-2 hover:animate-spin text-[#17b2b3]'
      />
    </div>
  )
}

export default Bar2
