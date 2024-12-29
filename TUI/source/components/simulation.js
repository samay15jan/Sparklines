import React, { useEffect, useState } from 'react'
import { Box, Text, useFocus } from 'ink'
import { Select } from '@inkjs/ui'
import { hexColors, colors } from '../utils/colors.js'
import Gradient from 'ink-gradient'

export function formatLabel (name, artist) {
	const formattedName = name?.split('(')[0]
	const formattedArtist = artist?.split(', ')[0]
	return `${formattedName} - ${formattedArtist}`
}

const Simulation = ({ id, data, returnPlaySongId, songFinished }) => {
	const { isFocused } = useFocus({ id })
	const [options, setOptions] = useState([])
	const [playingSongId, setPlayingSongId] = useState(false)

	useEffect(() => {
		returnPlaySongId(playingSongId)
	}, [playingSongId])

	useEffect(() => {
		if (data) {
			const updatedOptions = data.map((song) => ({
				label: formatLabel(song?.name || song?.title, song?.primaryArtists),
				value: song.id,
			}))
			setOptions(updatedOptions)
		}
	}, [data])

	useEffect(() => {
		if (songFinished) {
			const selectedIndex = data.findIndex((item) => item.id === playingSongId)
			if (selectedIndex !== -1 && selectedIndex < data.length - 1) {
				returnPlaySongId(data[selectedIndex + 1].id)
			} else {
				returnPlaySongId(null) // Implement Recommendations here
			}
		}
	}, [songFinished])

	return (
		<Box
			flexDirection='column'
			borderColor={isFocused ? `${colors.primary}` : 'white'}
			borderDimColor={!isFocused}
			borderStyle='round'
			width='100%'
		>
			<Box position='relative' marginTop='-1px' marginLeft='1px'>
				<Gradient name='morning'>
					<Text bold color={isFocused ? `${colors.primary}` : `white`}>
						{hexColors.primary(' ' + 'Simulation' + ' ')}
					</Text>
				</Gradient>
			</Box>
			<Select
				visibleOptionCount={20}
				options={options}
				isDisabled={!isFocused}
				highlightText
				onChange={(id) => setPlayingSongId(id)}
			/>
		</Box>
	)
}

export default Simulation
