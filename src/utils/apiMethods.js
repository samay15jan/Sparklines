import axios from "axios"

async function homepageData() {
  try {
    const userId = localStorage.getItem('userId')
    const headers = {
      'userid': `${userId}`,
      'Content-Type': 'application/json'
    }
    const language = localStorage.getItem('languages')
    const params = { language: language.toLowerCase() }
    const response = await axios.get('/api/modules', params, { headers })
    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('error', error)
  }

}

export { homepageData }