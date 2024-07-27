import React, { useEffect, useState } from 'react'
import { Box, useApp } from 'ink'
import axios from 'axios'
import { Spinner } from '@inkjs/ui'
import Menu from '../menu/menu.js'
import List from '../list/list.js'
import apiKey from '../../utils/apiKey.js'

const Simulation = ({ returnMainData }) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const { exit } = useApp()
	const [selectedMenu, setMenu] = useState('playlists')
	const [selectedPlaylistId, setPlaylistId] = useState(null)
	const key = apiKey()

	useEffect(() => {
		homepageData()
	}, [])

	useEffect(() => {
		playlistData()
	}, [selectedPlaylistId])

	async function playlistData() {
		if (!selectedPlaylistId) return
		try {
			const params = { id: selectedPlaylistId }
			const playlist = await axios.get(
				'https://sparklines-backend.vercel.app/playlists',
				{
					params,
					headers: {
						Authorization: `Bearer ${key}`,
						'Content-Type': 'application/json',
					},
				}
			)
			returnMainData(playlist?.data?.data)
		} catch (error) {
			console.error('Error fetching homepage data', error.response.data.message)
		}
	}

	async function homepageData() {
		try {
			const language = 'punjabi'
			const params = { language: language.toLowerCase() }
			const response = await axios.get(
				'https://sparklines-backend.vercel.app/modules',
				{
					params,
					headers: {
						Authorization: `Bearer ${key}`,
						'Content-Type': 'application/json',
					},
				}
			)
			if (response?.data.status === 'SUCCESS') {
				setData(response?.data?.data)
				setLoading(!loading)
				setPlaylistId(response?.data?.data?.playlists[0].id)
			}
		} catch (error) {
			console.error('Error fetching homepage data', error.response.data.message)
		}
	}

	const menuLists = [
		{
			id: 'playlists',
			data: data?.playlists,
		},
		{
			id: 'albums',
			data: data?.albums,
		},
		{
			id: 'charts',
			data: data?.charts,
		},
	]
	return (
		<Box flexDirection='column' borderDimColor width={42}>
			<Menu returnValue={(value) => setMenu(value)} />
			{loading ? (
				<Spinner type='dots' label='loading' />
			) : (
				<Box flexDirection='row' borderDimColor borderStyle='round'>
					{data && <List menuLists={menuLists} selectedMenu={selectedMenu} returnValue={(value) => null} />}
				</Box>
			)}
		</Box>
	)
}

export default Simulation
