import { useState, lazy } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { RotatingLines } from 'react-loader-spinner'
import { updateUsername, imageUploader } from '../../api/user.js'
import { motion } from 'framer-motion'
const SendButton = lazy(() => import('./SendButton'))

const Container = styled.div`
  ${tw`grid justify-center`}
`
const Heading = styled.div`
  ${tw`text-2xl mb-2 font-bold text-center`}
`
const Image = styled.img`
  ${tw`h-full object-cover cursor-pointer w-1/3 rounded-full`}
`
const Input = styled.input`
  ${tw`w-full text-lg p-2 my-2 h-12 rounded-md`}
  outline: 1px solid #ccced0;
  &:focus {
    outline: 2px solid grey;
  }
`

const Profile = ({ data, onNext, alreadyLoggedIn }) => {
  const [loading, setLoading] = useState('')
  const imageUrl =
    data.profilePic ||
    'https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/v1710355835/default/bzcj4ipftbmo48v30din.png'
  const [name, setName] = useState('')
  const [pic, setPic] = useState(imageUrl)
  const userId = data.userId
  const email = data.email

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleSkip = () => {
    onNext()
  }

  const handleNext = async () => {
    try {
      if (name || (data.username && pic)) {
        let params
        if (alreadyLoggedIn) {
          params = {
            username: data.username,
            profilePic: pic,
            userId: data.userId,
          }
        } else params = { username: name, profilePic: pic, userId: userId }
        const response = await updateUsername(params)
        if (response) {
          setDataLocally(response)
          onNext()
        } else {
          console.log(response.error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageUploader = async (event) => {
    const file = event.target.files[0]
    try {
      if (file) {
        setLoading(!loading)
        const profilePic = await imageUploader(file, userId)
        if (profilePic) {
          setLoading(false)
          setPic(profilePic)
        }
      } else {
        console.log("Couldn't upload profile picture")
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
  }

  const loadingComponent = (
    <RotatingLines
      visible={true}
      height='50'
      width='50'
      strokeColor='black'
      ariaLabel='rotating-lines-loading'
      strokeWidth='3'
      animationDuration='0.75'
    />
  )

  return (
    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 0.9 }}>
      {alreadyLoggedIn ? (
        <h1 className='mb-5 font-bold text-center'>Update Profile Pic</h1>
      ) : (
        <Heading>{'Complete your Profile'}</Heading>
      )}
      <Container>
        <>
          <motion.label
            autoFocus={true}
            htmlFor='file-upload'
            initial={{ rotate: 280 }}
            animate={{ rotate: 360 }}
            className='w-full flex justify-center mb-2'
          >
            <Image src={pic} alt='Upload Image' />
            <div
              className={
                alreadyLoggedIn
                  ? 'absolute mt-3 flex justify-center pointer-events-none'
                  : 'absolute mt-14 flex justify-center pointer-events-none'
              }
            >
              {loading ? loadingComponent : ''}
            </div>
          </motion.label>
          <input
            className='hidden'
            id='file-upload'
            type='file'
            onChange={handleImageUploader}
          />
        </>
      </Container>
      {alreadyLoggedIn ? (
        ''
      ) : (
        <Input
          placeholder='Name'
          type='name'
          value={name}
          onChange={handleName}
          autoComplete='off'
        />
      )}
      {alreadyLoggedIn ? (
        <button
          className='flex justify-center items-center w-full mt-1 text-white text-lg border mt-5 mb-2 rounded-md bg-[#23233f]'
          onClick={handleNext}
        >
          Save
        </button>
      ) : (
        <div className='grid grid-cols-2 space-x-1'>
          <SendButton value='Skip' onclick={handleSkip} />
          <SendButton value='Next' onclick={handleNext} />
        </div>
      )}
    </motion.div>
  )
}

export default Profile
