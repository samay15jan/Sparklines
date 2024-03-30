import axios from 'axios'

  // User Register
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData)
      if (response && response.status === 200) {
        return response.data
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
      const response = await axios.post('/api/auth/login', userData)
      if (response && response.status === 200) {
        const authToken = { Authorization: `Bearer ${response.data.data}` }
        const apiAuth = await axios.get('/api/user/profile', { headers: authToken })
        if(apiAuth && apiAuth.status === 200){
          return apiAuth.data
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
      const response = await axios.post('/api/user/updateData', data)
      if (response && response.status === 200) {
        return response.data.data
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
      const response = await axios.post('/api/user/imageUploader', formData)
      if (response && response.status === 200) {
        return response.data.data
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
      const response = await axios.post('/api/user/addLanguages', data)
      if (response && response.status === 200) {
        return { success: response.data.data }
      } 
    } catch (error) {
      if (error.response.status === 500 || 401 || 404) {
        return { error: error.response.data.message }
      }
    }
  }

export { register, login, updateData, imageUploader, addLanguages }