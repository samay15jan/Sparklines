import got, { HTTPError } from 'got-cjs'
import { HttpExceptionError } from '../exceptions/http.exception'
import { PayloadService } from '../services/payload.service'
import { formatPlainLyrics, normalizeQueryParam, stripLrcTimestamps } from '../utils/lyrics'

// https://lrclib.net/docs - free, no API key required
const LRCLIB_BASE_URL = 'https://lrclib.net'
// LRCLIB asks clients to identify themselves; no key required, just good etiquette
const USER_AGENT = 'Sparklines/1.0 (+https://github.com/samay15jan/sparklines-backend)'

interface LrclibTrack {
  id: number
  trackName: string
  artistName: string
  albumName: string
  duration: number
  instrumental: boolean
  plainLyrics: string | null
  syncedLyrics: string | null
}

export class LyricsService extends PayloadService {
  public songLyrics = async (songName: string, artistName: string, albumName?: string, duration?: string) => {
    const song = normalizeQueryParam(songName)
    const artist = normalizeQueryParam(artistName)
    const album = albumName ? normalizeQueryParam(albumName) : undefined

    if (!song || !artist) throw new HttpExceptionError(404, 'lyrics not found')

    try {
      // when we know the exact duration, /api/get gives the most precise match
      // (LRCLIB matches duration within +/-2s) - try it first, then fall back
      // to fuzzy search either when there's no duration or it comes up empty
      if (duration) {
        const exactMatch = await this.fetchExactMatch(song, artist, album, duration)
        if (exactMatch) return exactMatch
      }

      const searchMatch = await this.fetchBestSearchMatch(song, artist, album)
      if (searchMatch) return searchMatch

      throw new HttpExceptionError(404, 'lyrics not found')
    } catch (error) {
      if (error instanceof HttpExceptionError) throw error

      throw new HttpExceptionError(500, 'failed to fetch lyrics')
    }
  }

  private fetchExactMatch = async (song: string, artist: string, album: string | undefined, duration: string) => {
    try {
      const track = await got
        .get('api/get', {
          prefixUrl: LRCLIB_BASE_URL,
          searchParams: {
            track_name: song,
            artist_name: artist,
            ...(album ? { album_name: album } : {}),
            duration,
          },
          headers: { 'User-Agent': USER_AGENT },
          responseType: 'json',
        })
        .json<LrclibTrack>()

      return this.trackToPayload(track)
    } catch (error) {
      if (error instanceof HTTPError && error.response.statusCode === 404) return null
      throw error
    }
  }

  private fetchBestSearchMatch = async (song: string, artist: string, album?: string) => {
    try {
      const tracks = await got
        .get('api/search', {
          prefixUrl: LRCLIB_BASE_URL,
          searchParams: {
            track_name: song,
            artist_name: artist,
            ...(album ? { album_name: album } : {}),
          },
          headers: { 'User-Agent': USER_AGENT },
          responseType: 'json',
        })
        .json<LrclibTrack[]>()

      const bestMatch = tracks?.find((track) => !track.instrumental && (track.plainLyrics || track.syncedLyrics))

      if (!bestMatch) return null

      return this.trackToPayload(bestMatch)
    } catch (error) {
      if (error instanceof HTTPError && error.response.statusCode === 404) return null
      throw error
    }
  }

  private trackToPayload = (track: LrclibTrack) => {
    if (!track || track.instrumental) return null
    if (!track.plainLyrics && !track.syncedLyrics) return null

    const rawLyrics = track.plainLyrics || stripLrcTimestamps(track.syncedLyrics as string)
    const lyrics = formatPlainLyrics(rawLyrics)

    if (!lyrics) return null

    return this.lyricsPayload(lyrics)
  }
}
