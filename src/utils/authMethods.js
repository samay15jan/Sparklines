import axios from 'axios'

  // User Register
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData)
      if (response && response.status === 201) {
        return { success: response.data.message }
      } 
    } catch (error) {
        if (error.response.status === 500) {
          return { error: error.response.data.message }
        }
    }
  }
  
  // User Login
  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData)
      if (response && response.status === 200) {
        const authToken = { Authorization: `Bearer ${response.data.token}` }
        const apiAuth = await axios.get('http://localhost:3000/user/profile', { headers: authToken })
        if(apiAuth && apiAuth.status === 200){
          return { data: apiAuth.data.userData }
        }
      }
    } catch (error) {
        if (error.response.status === 500 || 401 || 404) {
          return { error: error.response.data.message }
        }
    }
  }

  // Update Username
  const updateData = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/user/updateData', data)
      if (response && response.status === 200) {
        return { userData: response.data.userData }
      } 
    } catch (error) {
      if (error.response.status === 500 || 401 || 404) {
        return { error: error.response.data.message }
      }
    }
  }

  // Update ProfilePic
  const imageUploader = async (pic) => {
    try {
      const formData = new FormData()
      formData.append('profilePic', pic)
      const response = await axios.post('http://localhost:3000/user/imageUploader', formData)
      if (response && response.status === 200) {
        return { profilePic: response.data.profilePic }
      } 
    } catch (error) {
      if (error.response.status === 500 || 401 || 404) {
        return { error: error.response.data.message }
      }
    }
  }

  // Add Languages 
  const addLanguages = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/user/addLanguages', data)
      if (response && response.status === 200) {
        return { success: response.data.languages }
      } 
    } catch (error) {
      if (error.response.status === 500 || 401 || 404) {
        return { error: error.response.data.message }
      }
    }
  }

export { register, login, updateData, imageUploader, addLanguages }