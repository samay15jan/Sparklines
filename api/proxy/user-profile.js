import axios from 'axios'

export default async function handler(req, res) {
  const authToken = req.headers['authorization']

  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const response = await axios.get(
      'https://sparklines-backend.vercel.app/user/profile',
      {
        headers: {
          Authorization: authToken,
        },
      }
    )

    if (response && response.status === 200) {
      return response
    }
  } catch (error) {
    const statusCodes = [500, 401, 404]
    if (statusCodes.includes(error.response.status)) {
      return { error: error.response.data.message }
    }
  }
}
