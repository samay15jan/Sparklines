import { MdClose } from 'react-icons/md'
;``
const LyricsScreen = ({ lyricsData, songData, showMenu }) => {
  if (!lyricsData?.data?.lyrics) {
    return (
      <>
        <button
          className='relative top-0 opacity-60 font-bold bg-[#202020]'
          onClick={() => showMenu('nowPlaying')}
        >
          <MdClose size={30} />
        </button>
        <div className='text-xl mt-80 text-center w-auto'>
          Lyrics Not found !
        </div>
      </>
    )
  }

  function formatLyrics(lyrics) {
    const formattedLyrics = []
    const verses = lyrics.split(/\[(.*?)\]/).filter(Boolean)

    verses.forEach((verse, index) => {
      if (index % 2 === 0) {
        // Handle the label (Intro, Verse, Chorus, etc.)
        formattedLyrics.push(
          <div className='mt-5 opacity-50' key={`verse-${index}`}>
            <strong>{verse}</strong>
          </div>
        )
      } else {
        // Handle the actual lyrics
        const words = verse.trim().split(/\s+/)
        let line = []

        words.forEach((word, wordIndex) => {
          line.push(word)
          if (line.length >= 6) {
            formattedLyrics.push(
              <div className='mt-2' key={`line-${index}-${wordIndex}`}>
                {line.join(' ')}
              </div>
            )
            line = []
          }
        })

        if (line.length > 0) {
          formattedLyrics.push(
            <div className='mt-2' key={`line-${index}-end`}>
              {line.join(' ')}
            </div>
          )
        }
      }
    })

    return formattedLyrics
  }

  const lyrics = formatLyrics(lyricsData?.data?.lyrics)

  return (
    <>
      {lyricsData?.data && (
        <div>
          <div className='py-2 bg-[#202020] font-semibold text-sm'>
            <button
              className='absolute opacity-60 font-bold bg-[#202020]'
              onClick={() => showMenu('nowPlaying')}
            >
              <MdClose size={25} />
            </button>
            <h1 className='text-center'>{songData?.name}</h1>
          </div>
          <div className='m-10 text-2xl mt-4 text-center'>{lyrics}</div>
        </div>
      )}
    </>
  )
}

export default LyricsScreen
