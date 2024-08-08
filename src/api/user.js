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
      const apiAuth = await axios.get('/api/user/profile', {
        headers: authToken,
      })
      if (apiAuth && apiAuth.status === 200) {
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
const updateUsername = async (data) => {
  try {
    const headers = {
      userid: `${data.userId}`,
      'Content-Type': 'application/json',
    }
    const response = await axios.post('/api/user/updateData', data, {
      headers,
    })
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
const imageUploader = async (pic, userId) => {
  try {
    const headers = {
      userid: `${userId}`,
      'Content-Type': 'multipart/form-data',
    }
    const formData = new FormData()
    formData.append('profilePic', pic)
    const response = await axios.post('/api/user/imageUploader', formData, {
      headers,
    })
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
    const headers = {
      userid: `${data.userId}`,
      'Content-Type': 'application/json',
    }
    const response = await axios.post('/api/user/addLanguages', data, {
      headers,
    })
    if (response && response.status === 200) {
      return response.data.data
    }
  } catch (error) {
    if (error.response.status === 500 || 401 || 404) {
      return { error: error.response.data.message }
    }
  }
}

const updateFollowing = async (data, action) => {
  try {
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
    const options = {
      method: 'POST',
      url: '/api/user/updateFollowing',
      data: {
        artistData: data,
        action: action,
      },
      headers: {
        userid: `${userId}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.request(options)
    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    if (error.response.status === 500 || 401 || 404) {
      return { error: error.response.data.message }
    }
  }
}

export {
  register,
  login,
  updateUsername,
  imageUploader,
  addLanguages,
  updateFollowing,
}
