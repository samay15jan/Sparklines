import { Client } from 'genius-lyrics'
import { HttpExceptionError } from '../exceptions/http.exception'
import { PayloadService } from '../services/payload.service'

export class LyricsService extends PayloadService {
  public songLyrics = async (songName: string, artistName: string) => {
    // as LyricsRequest
    const client = new Client()
    const response = await client.songs.search(
      `${decodeURIComponent(songName as string)} ${decodeURIComponent(
        artistName?.length > 1 ? (artistName as string) : ''
      )}`
    )

    if (!response) throw new HttpExceptionError(404, 'Song not found')

    const getLyrics = await response[0]?.lyrics()

    if (!getLyrics) throw new HttpExceptionError(404, 'lyrics not found')

    const lyrics = this.lyricsPayload(getLyrics)

    return lyrics
  }
}
