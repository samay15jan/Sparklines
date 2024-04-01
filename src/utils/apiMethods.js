import axios from "axios"

async function homepageData() {
  try {
    const language = localStorage.getItem('languages')
    const params = { language: language.toLowerCase() }
    const response = await axios.get('/api/modules', params)
    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('error', error)
  }

}

export { homepageData }