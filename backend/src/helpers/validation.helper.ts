import { Joi, Modes, Segments, celebrate } from 'celebrate'

export const searchSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      query: Joi.string().required(),
      page: Joi.string().default(1),
      limit: Joi.string().default(10),
      userId: Joi.string(),
      apiKey: Joi.string(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const songsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object()
      .keys({
        id: Joi.string(),
        link: Joi.string().custom((value, helper) => {
          if (value.includes(`jiosaavn.com/song/`)) {
            const token = value.split(`/song/`)[1]?.split('/')[1]?.slice(0, 11)
            return token
          } else {
            return helper.message({
              custom: 'invalid song link',
            })
          }
        }),
        userId: Joi.string(),
        apiKey: Joi.string(),
      })
      .xor('id', 'link')
      .messages({ error: 'id and link are not supported together, pass only one of them' }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const albumsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object()
      .keys({
        id: Joi.string(),
        link: Joi.string().custom((value, helper) => {
          if (value.includes(`jiosaavn.com/album/`)) {
            const token = value.split(`album/`)[1].split('/')[1].slice(0, 11)

            return token
          } else {
            return helper.message({
              custom: 'invalid album link',
            })
          }
        }),
        userId: Joi.string(),
        apiKey: Joi.string(),
      })
      .xor('id', 'link')
      .messages({ error: 'id and link are not supported together, pass only one of them' }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const artistsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object()
      .keys({
        id: Joi.string(),
        link: Joi.string().custom((value, helper) => {
          if (value.includes(`jiosaavn.com/artist/`)) {
            const token = value.split(`artist/`)[1].split('/')[1].slice(0, 11)

            return token
          } else {
            return helper.message({
              custom: 'invalid artist link',
            })
          }
        }),
        userId: Joi.string(),
        apiKey: Joi.string(),
      })
      .xor('id', 'link')
      .messages({ error: 'id and link are not supported together, pass only one of them' }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const artistSongsAndAlbumsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.string().default(1),
      category: Joi.string().valid('alphabetical', 'latest').optional(),
      sort: Joi.string().valid('asc', 'desc').optional(),
      userId: Joi.string(),
      apiKey: Joi.string(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const idSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().required(),
      userId: Joi.string(),
      apiKey: Joi.string(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)

export const lyricsSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      songName: Joi.string().required(),
      artistName: Joi.string().required(),
      userId: Joi.string(),
      apiKey: Joi.string(),
    }),
  },
  { abortEarly: false },
  { mode: Modes.FULL }
)
