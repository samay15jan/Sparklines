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
        switch (apiAuth.status) {
          case 200:
              return { data: apiAuth.data.userData }
          case 401:
              return { error: apiAuth.data.message }
          case 404:
              return { error: apiAuth.data.message }
          default:
              return { error: "Unexpected error occurred" }
        }
      }
    } catch (error) {
        if (error.response.status === 500 || 401 || 404) {
          return { error: error.response.data.message }
        }
    }
  }

export { register, login }