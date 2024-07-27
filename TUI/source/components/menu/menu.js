import { Box } from 'ink'
import React from 'react'
import { Select } from '@inkjs/ui'

const menu = ({ returnValue }) => {
	return (
		<Box borderStyle='round' borderDimColor flexDirection='column'>
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
				onChange={(newValue) => {
          returnValue(newValue)
				}}
			/>
		</Box>
	)
}

export default menu
