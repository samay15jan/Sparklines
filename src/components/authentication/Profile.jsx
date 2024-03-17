import React, { useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
const SendButton = lazy(() => import('./SendButton'))
import { updateData, imageUploader } from '../../utils/authMethods'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`${tw`grid justify-center`}`
const Heading = styled.div`${tw`text-2xl mb-2 font-bold text-center`}`
const Image = styled.img`${tw`h-full object-cover w-1/3 rounded-full`}`
const Upload = styled.label`${tw`w-full flex justify-center hover:ring-gray-500 hover:ring-2 mb-2`}`
const Input = styled.input`${tw`w-full text-lg p-2 my-2 h-12 rounded-md`}
  outline: 1px solid #ccced0;
  &:focus {
    outline: 2px solid grey;
}`


const Profile = ({ data }) => {
  const imageUrl = 'https://res.cloudinary.com/sparklines/image/upload/v1710355835/default/bzcj4ipftbmo48v30din.png'
  const [name, setName] = useState('')
  const [pic, setPic] = useState(imageUrl)
  const userId = data.userId
  const email = data.email
  const newUser = data.newUser

  const navigate = useNavigate()

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const handleNext = async () => {
    try {
      if (name && pic) {
        const data = { 'username': name, 'profilePic': pic, 'userId': userId }
        const response = await updateData(data)
        if (response.userData) {
          setDataLocally(response.userData)
          navigate('/dashboard')
        }
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageUploader = async (event) => {
    const file = event.target.files[0]
    try {
      if (file) {
        const response = await imageUploader(file)
        if (response.profilePic) {
          setPic(response.profilePic)
        }
      } else {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setDataLocally = (data) => {
    localStorage.setItem('userId', userId)
    localStorage.setItem('email', email)
    localStorage.setItem('username', data.username)
    localStorage.setItem('profilePic', data.profilePic)
    localStorage.setItem('newUser', newUser)
  }

  return (
    <div>
      <Heading>{'Complete your Profile'}</Heading>
      <Container>
        <>
          <Upload autoFocus={true} htmlFor="file-upload">
            <Image src={pic} alt="Upload Image" />
          </Upload>
          <input className='hidden' id="file-upload" type="file" onChange={handleImageUploader} />
        </>
      </Container>
      <Input placeholder='Name' type='name' value={name} onChange={handleName} autoComplete='off' />
      <div className='grid grid-cols-2 space-x-2'>
        <SendButton value='Skip' onclick={handleSkip}/>
        <SendButton value='Next' onclick={handleNext} />
      </div>
    </div>
  )
}

export default Profile