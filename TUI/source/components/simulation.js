import React, { useEffect, useState } from 'react'
import { Box, useFocus } from 'ink'
import { Select } from '@inkjs/ui'

const Simulation = ({ id, data, returnPlaySongID }) => {
	const { isFocused } = useFocus({ id })
	const [options, setOptions] = useState([])

	useEffect(() => {
		if (data) {
			const updatedOptions = data.map((song) => ({
				label:
					song?.name + ' - ' + song?.primaryArtists ||
					song?.title + ' - ' + song?.primaryArtists,
				value: song.id,
			}))

			setOptions(updatedOptions)
		}
	}, [data])

	return (
		<Box
			flexDirection='column'
			borderColor={isFocused ? '#c69a67' : ''}
			borderDimColor={!isFocused}
			borderStyle='round'
			width={Infinity}
		>
			<Select
				visibleOptionCount={20}
				options={options}
				isDisabled={!isFocused}
				onChange={(id) => returnPlaySongID(id)}
			/>
		</Box>
	)
}

export default Simulation
