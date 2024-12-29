import axios from 'axios'
import apiKey from '../utils/apiKey.js'
import { useEffect, useState } from 'react'
import { useApp } from 'ink'
import fs from 'fs'
import os from 'os'
import path from 'path'

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
	const [languages, setLanguages] = useState([])
	const key = apiKey()

	const configPath = path.join(os.homedir(), '.sparklines', 'config')

	function loadLanguagesFromFile() {
		fs.readFile(configPath, 'utf8', (err, fileData) => {
			if (err) {
				console.error('Error reading config file:', err)
				exit()
				return
			}

			let currentConfig
			try {
				currentConfig = JSON.parse(fileData)
			} catch (error) {
				console.error('Error parsing config file:', error)
				exit()
				return
			}

			setLanguages(currentConfig.languages || [])
		})
	}

	async function fetchHomepageData() {
		try {
			isLoading(true)

			if (languages.length === 0) {
				setLanguages(['english'])
			}

			const params = { language: languages.join(',').toLowerCase() }
			const endpoint = '/modules'

			const apiResponse = await handleAPI(params, endpoint, key)
			returnResponse(apiResponse?.data?.data)
			isLoading(false)
			defaultPlaylistId(apiResponse?.data?.data?.playlists[0].id)
		} catch (error) {
			console.error(
				'Error fetching homepage data',
				error?.response?.data?.message
			)
			exit()
		}
	}

	useEffect(() => {
		loadLanguagesFromFile()
	}, [])

	useEffect(() => {
		if (languages.length > 0) {
			fetchHomepageData()
		}
	}, [languages])

	return null
}

export { HomepageData, PlaylistData }
