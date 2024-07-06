import axios from 'axios'

// Homepage
async function homepageData() {
  try {
    const language = localStorage.getItem('languages') || 'english'
    const params = { language: language.toLowerCase() }
    return await handleApi(params, '/api/modules')
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    throw error
  }
}

// Search
async function searchAll(searchText) {
  try {
    if (!searchText) {
      return
    }
    const params = { query: searchText }
    return await handleApi(params, '/api/search/all')
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

async function searchSpecific(type, query, page) {
  try {
    if (!type && !query) {
      return
    }
    if (type !== 'songs' || 'albums' || 'artists' || 'playlists') {
      return
    }
    const params = {
      page: page || 1,
      query: query,
    }
    return await handleApi(params, `/api/search/${type}`)
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

// Songs
async function songDetails(id) {
  try {
    if (id) {
      return await handleApi({id: id}, '/api/songs')
    } else {
      const playbackId = localStorage.getItem('playback')
      const parsedId = JSON.parse(playbackId)
      if (!parsedId[0]) {
        return
      }
      const params = { id: parsedId[0] }
      return await handleApi(params, '/api/songs')
    }
  } catch (error) {
    console.error('Error fetching playback song', error)
    throw error
  }
}

// Albums
async function albumDetails(albumId) {
  try {
    if (!albumId) {
      return
    }
    const params = { id: albumId }
    return await handleApi(params, '/api/albums')
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    throw error
  }
}

// Playlist
async function playlistDetails(playlistId) {
  try {
    if (!playlistId) {
      return
    }
    const params = { id: playlistId }
    return await handleApi(params, '/api/playlists')
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    throw error
  }
}

// Artists
async function artistDetails(artistId) {
  try {
    if (!artistId) {
      return
    }
    const params = { id: artistId }
    return await handleApi(params, '/api/artists')
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function artistSongs(artistId, page, category, sort) {
  try {
    if (!artistId) {
      return
    }
    const params = {
      page: page || 1,
      category: category || null, // alphabetical or latest
      sort: sort || null, // asc or desc
    }
    return await handleApi(params, `/api/artists/${artistId}/songs`)
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function artistAlbums(artistId, page, category, sort) {
  try {
    if (!artistId) {
      return
    }
    const params = {
      page: page || 1,
      category: category || null, // alphabetical or latest
      sort: sort || null, // asc or desc
    }
    return await handleApi(params, `/api/artists/${artistId}/albums`)
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

async function artistRecommendations(artistId, songId) {
  try {
    if (!artistId && !songId) {
      return
    }
    const params = null
    return await handleApi(
      params,
      `/api/artists/${artistId}/recommendations/${songId}`
    )
  } catch (error) {
    console.error('Error searching artist:', error)
    throw error
  }
}

//Lyrics
async function lyrics(lyricsId) {
  try {
    if (!lyricsId) {
      return
    }
    const params = { id: lyricsId }
    return await handleApi(params, '/api/lyrics')
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    throw error
  }
}

// Common Method
async function handleApi(params, url) {
  try {
    const userId = localStorage.getItem('userId') || process.env.USERID_DEFAULT
    const options = {
      method: 'GET',
      url: url,
      params: params,
      headers: {
        userid: `${userId}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await axios.request(options)
    if (response && response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch data from API')
    }
  } catch (error) { }
}

export {
  homepageData,
  searchAll,
  searchSpecific,
  songDetails,
  albumDetails,
  playlistDetails,
  artistDetails,
  artistSongs,
  artistAlbums,
  artistRecommendations,
  lyrics,
}
