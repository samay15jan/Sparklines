// The frontend replaces spaces with literal '+' before sending song/artist
// names (see ArtistsScreen.jsx / Public.jsx), intending it as a URL-safe
// space. Axios then percent-encodes that '+' as '%2B', so by the time it
// reaches us it's a literal '+' character, not a space - decodeURIComponent
// alone does NOT turn '+' back into ' '. This mirrors how
// application/x-www-form-urlencoded values are supposed to be decoded.
export const normalizeQueryParam = (value?: string): string => {
  if (!value) return ''

  return decodeURIComponent(value.replace(/\+/g, ' ')).trim()
}

// LRCLIB returns plain, unlabelled lyrics text. Sparklines' frontend
// (LyricsScreen.jsx) splits rendered lyrics on `[...]` section markers the
// way Genius' `[Verse]`/`[Chorus]` tags used to work - without a bracketed
// label the whole block gets treated as a single unformatted header instead
// of being split into readable lines. Prefixing a generic `[Lyrics]` label
// keeps that renderer working without any frontend changes.
export const formatPlainLyrics = (lyrics?: string | null): string => {
  if (!lyrics) return ''

  const trimmed = lyrics.trim()
  if (!trimmed) return ''

  return `[Lyrics]\n${trimmed}`
}

// Fallback for when only LRC-format synced lyrics are available: strips the
// leading `[mm:ss.xx]` timestamp from each line, leaving plain text.
export const stripLrcTimestamps = (syncedLyrics: string): string =>
  syncedLyrics
    .split('\n')
    .map((line) => line.replace(/^\[\d{2}:\d{2}(?:\.\d{1,3})?\]\s*/, ''))
    .join('\n')
    .trim()
