import axios from 'axios'

// Add Languages
const addLanguages = async (data) => {
	try {
		const headers = {
			userid: `${data.userId}`,
			'Content-Type': 'application/json',
		}
		const response = await axios.post('/api/user/addLanguages', data, {
			headers,
		})
		if (response && response.status === 200) {
			return response.data.data
		}
	} catch (error) {
		if (error.response.status === 500 || 401 || 404) {
			return { error: error.response.data.message }
		}
	}
}

export { addLanguages }