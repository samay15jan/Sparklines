import React, { useState } from 'react'
import { Box, Text, useFocus, useInput } from 'ink'
import { Select, Spinner, TextInput } from '@inkjs/ui'
import { hexColors, colors } from '../utils/colors.js'
import Gradient from 'ink-gradient'
import figures from 'figures'
import { useApp } from 'ink'
import apiKey from '../utils/apiKey.js'
import axios from 'axios'
import { formatLabel } from './simulation.js'

const Toggleable = ({ id, returnSongId, returnSongData }) => {
	const { isFocused } = useFocus({ id })
	const [options, setOptions] = useState([])
	const [selectedMenu, setSelectedMenu] = useState('')
	const [searchData, setSearchData] = useState(null)
	const [query, setQuery] = useState('')
	const [type, setType] = useState('songs') // 'songs' || 'albums' || 'artists' || 'playlists'
	const [isLoading, setIsLoading] = useState(false)
	const { exit } = useApp()
	const key = apiKey()
	const [isInputVisible, setIsInputVisible] = useState(true)

	function handleReturnData(playingSongId) {
		const playingSong = searchData?.find((song) => song?.id === playingSongId)
		returnSongId(playingSongId)
		returnSongData(playingSong)
	}

	useInput((input, key) => {
		if (key.ctrl && input === 'k') {
			setSelectedMenu('search')
		} else if (key.ctrl && input === 'l') {
			setSelectedMenu('lyrics')
		} else if (key.ctrl + key.shift && input === ';') {
			setSelectedMenu('queue')
		} else if (key.ctrl && input === 'x') {
			setSelectedMenu(null)
		} else if (key.ctrl && input === 'z') {
			setIsInputVisible(!isInputVisible)
		}
	})

	async function makeRequest(params) {
		return await axios.get(
			`https://sparklines-backend.vercel.app/search/${type}`,
			{
				params,
				headers: {
					Authorization: `Bearer ${key}`,
					'Content-Type': 'application/json',
				},
			}
		)
	}

	const searchRequest = async () => {
		try {
			if (!type && !query) {
				return
			}
			setIsLoading(true)
			const params = {
				page: 1,
				query: query,
			}
			const apiResponse = await makeRequest(params)
			const response = apiResponse && apiResponse?.data?.data?.results
			if (response) {
				const updatedOptions = response.map((song) => ({
					label: formatLabel(song?.name || song?.title, song?.primaryArtists),
					value: song?.id,
				}))
				setOptions(updatedOptions)
				setSearchData(apiResponse?.data?.data?.results)
			}
			setIsLoading(false)
		} catch (error) {
			console.error(
				'Error fetching search data',
				error?.response?.data?.message
			)
			exit()
		}
	}

	function handleInput() {
		searchRequest()
		setIsInputVisible(false)
	}

	return (
		<>
			{selectedMenu && (
				<Box
					flexDirection='column'
					borderColor={isFocused ? `${colors.primary}` : 'white'}
					borderDimColor={!isFocused}
					borderStyle='round'
					width='80%'
				>
					<Box position='relative' marginTop='-1px' justifyContent='flex-end'>
						<Gradient name='morning'>
							<Text bold color={isFocused ? `${colors.primary}` : `white`}>
								{selectedMenu === 'search' &&
									hexColors.primary(
										' ' +
											`[${figures.cross}] | ${figures.bullet} | ${figures.triangleUp}` +
											' '
									)}
								{selectedMenu === 'lyrics' &&
									hexColors.primary(
										' ' +
											`${figures.cross} | [${figures.bullet}] | ${figures.triangleUp}` +
											' '
									)}
								{selectedMenu === 'queue' &&
									hexColors.primary(
										' ' +
											`${figures.cross} | ${figures.bullet} | [${figures.triangleUp}]` +
											' '
									)}
							</Text>
						</Gradient>
					</Box>
					{selectedMenu === 'search' && isInputVisible && (
						<Box
							borderStyle='round'
							borderColor={isFocused ? `${colors.primary}` : 'white'}
						>
							<TextInput
								placeholder='Search Something'
								onChange={(value) => setQuery(value)}
								onSubmit={handleInput}
								isDisabled={!isFocused}
							/>
						</Box>
					)}
					{isLoading ? (
						<Spinner type='dots' label='loading' />
					) : (
						<>
							{options.length > 0 && selectedMenu === 'search' && (
								<Box
									borderColor={isFocused ? `${colors.primary}` : 'white'}
									borderStyle='round'
									display='flex'
									flexDirection='column'
									height='80%'
								>
									<Box position='relative' marginTop='-1px' marginLeft='1px'>
										<Gradient name='morning'>
											<Text
												bold
												color={isFocused ? `${colors.primary}` : `white`}
											>
												{hexColors.primary(' ' + 'Search Results' + ' ')}
											</Text>
										</Gradient>
									</Box>
									<Select
										visibleOptionCount={10}
										options={options}
										isDisabled={!isFocused}
										onChange={(id) => handleReturnData(id)}
									/>
								</Box>
							)}
						</>
					)}
					{selectedMenu === 'lyrics' && (
						<Box
							flexDirection='flex'
							alignItems='center'
							width='100%'
							paddingTop='10'
							marginLeft='1'
						>
							<Gradient name='morning'>
								<Text>Lyrics Coming Soon!</Text>
							</Gradient>
						</Box>
					)}
					{selectedMenu === 'queue' && (
						<Box
							flexDirection='flex'
							alignItems='center'
							width='100%'
							paddingTop='10'
							marginLeft='1'
						>
							<Gradient name='morning'>
								<Text>Queue Coming Soon!</Text>
							</Gradient>
						</Box>
					)}
				</Box>
			)}
		</>
	)
}

export default Toggleable
