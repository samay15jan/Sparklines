import axios from "axios"

async function homepageData() {
  try {
    const userId = localStorage.getItem('userId') || '65f84dd13e8dfb5930030849'  //TODO: Setup With dotenv 
    const language = localStorage.getItem('languages') || 'english'
    const options = {
      method: 'GET',
      url: '/api/modules',
      params: { language: language.toLowerCase() },
      headers: {
        'userid': `${userId}`,
        'Content-Type': 'application/json'
      }
  }

    const response = await axios.request(options)
    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('error', error)
  }
}

async function playbackSong() {
  try {
    const userId = localStorage.getItem('userId')
    const playbackId = localStorage.getItem('playback')
    const options = {
      method: 'GET',
      url: '/api/songs',
      params: { id: playbackId },
      headers: {
        'userid': `${userId}`,
        'Content-Type': 'application/json'
      }
  }

    const response = await axios.request(options)
    if (response && response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('error', error)
  }
}

export { homepageData, playbackSong }