import axios from 'axios'
import apiKey from '../utils/apiKey.js'
import { useEffect } from 'react'
import { useApp } from 'ink'

const handleAPI = async (params, endpoint, key) => {
	return await axios.get(`https://sparklines-backend.vercel.app${endpoint}`, {
		params,
		headers: {
			Authorization: `Bearer ${key}`,
			'Content-Type': 'application/json',
		},
	})
}

const PlaylistData = ({ playlistId, returnResponse, isLoading }) => {
	if (!playlistId) return
	const { exit } = useApp()
	const key = apiKey()

	async function fetchPlaylistData() {
		try {
			isLoading(true)
			const params = { id: playlistId }
			const endpoint = '/playlists'
			const apiResponse = await handleAPI(params, endpoint, key)
			returnResponse(apiResponse?.data?.data)
			isLoading(false)
		} catch (error) {
			console.error(error.response?.data?.message || error.message)
			exit()
		}
	}

	useEffect(() => {
		if (!playlistId) return
		fetchPlaylistData()
	}, [playlistId])
}

const HomepageData = ({ returnResponse, isLoading, defaultPlaylistId }) => {
	const { exit } = useApp()
	const key = apiKey()

	async function fetchHomepageData() {
		try {
			isLoading(true)
			const language = 'punjabi'
			const params = { language: language.toLowerCase() }
			const endpoint = '/modules'
			const apiResponse = await handleAPI(params, endpoint, key)
			returnResponse(apiResponse?.data?.data)
			isLoading(false)
			defaultPlaylistId(apiResponse?.data?.data?.playlists[0].id)
		} catch (error) {
			console.error('Error fetching homepage data', error?.response?.data?.message)
			exit()
		}
	}

	useEffect(() => {
		fetchHomepageData()
	}, [])
}

export { HomepageData, PlaylistData }
