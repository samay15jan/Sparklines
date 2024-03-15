import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import SendButton from './SendButton'
import { updateData, updateProfile } from '../../utils/authMethods'

const Container = styled.form`${tw`grid justify-center`}`
const Heading = styled.div`${tw`text-2xl mb-2 font-bold text-center`}`
const Image = styled.img`${tw`h-full object-cover w-1/3 rounded-full mb-6`}`
const Upload = styled.label`${tw`w-full flex justify-center hover:ring-gray-500 hover:ring-2 mb-2`}`
const Input = styled.input`${tw`w-full text-lg p-2 my-2 h-12 rounded-md`}
  outline: 1px solid #ccced0;
  &:focus {
    outline: 2px solid grey;
}`


const ProfilePic = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState(true)

  const imageUrl = 'https://res.cloudinary.com/sparklines/image/upload/v1710355835/default/bzcj4ipftbmo48v30din.png' 

  const handleEmail = (event) => {
    setName(event.target.value)
  }

  const handleData = (event) => {
    event.preventDefault()
    
  }

  return (
    <div>
      <Heading>{type ? 'Upload Profile Photo' : 'Enter Your Name'}</Heading>
      {type
       ? (
        <Container encType="multipart/form-data" method="post">
          <>
            <Upload htmlFor="file-upload">
              <Image src={imageUrl} alt="Upload Image"/>
            </Upload>
            <input className='hidden' id="file-upload" type="file"/>
          </>
        </Container>
       ) : <Input placeholder='Name' type='name' value={name} onChange={handleEmail} autoComplete='off' />
      }
      <div className='grid grid-cols-2 space-x-2'>
        <SendButton value='Skip' onclick={() => setType(!type)}/>
        <SendButton value='Next' />
      </div>
    </div>
  )
}

export default ProfilePic