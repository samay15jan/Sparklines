import { Box, useFocus } from 'ink'
import React from 'react'
import { Select } from '@inkjs/ui'

const menu = ({ id, returnValue }) => {
	const { isFocused } = useFocus({ id })
	return (
		<Box
			borderStyle='round'
			borderColor={isFocused ? '#c69a67' : ''}
			borderDimColor={!isFocused}
			flexDirection='column'
		>
			<Select
				options={[
					{
						label: 'Latest Playlists',
						value: 'playlists',
					},
					{
						label: 'Top Albums',
						value: 'albums',
					},
					{
						label: 'New Charts',
						value: 'charts',
					},
				]}
				isDisabled={!isFocused}
				onChange={(newValue) => {
					returnValue(newValue)
				}}
			/>
		</Box>
	)
}

export default menu
