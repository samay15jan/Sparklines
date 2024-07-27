import React, { useEffect, useState } from 'react'
import { Box } from 'ink'
import { Select } from '@inkjs/ui'
import Playback from '../playback/playback.js'

const Main = ({ data }) => {
	const [playSong, setPlaySong] = useState(null)
	const [options, setOptions] = useState([])

	useEffect(() => {
		if (data) {
			const updatedOptions = data.songs.map((song) => ({
				label: song?.name || song?.title,
				value: song?.downloadUrl[4]?.link,
			}))

			setOptions(updatedOptions)
		}
	}, [data])

	return (
		<Box
			flexDirection='column'
			height={20}
			borderDimColor
			borderStyle='round'
			width={Infinity} 
		>
			<Select
				visibleOptionCount={20}
				highlightText='Songs'
				options={options}
				onChange={(url) => setPlaySong(url)}
			/>
			<Playback url={playSong} />
		</Box>
	)
}

export default Main
