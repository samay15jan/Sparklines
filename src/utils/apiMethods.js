import axios from "axios"

async function homepageData() {
  try {
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
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
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
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

async function searchArtist() {
  try {
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
    const artistId = localStorage.getItem('artist')
    const options = {
      method: 'GET',
      url: '/api/artists',
      params: { id: artistId },
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


export { homepageData, playbackSong, searchArtist }