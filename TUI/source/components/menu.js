import { Box, useFocus, Text } from 'ink'
import React from 'react'
import { Select } from '@inkjs/ui'
import { hexColors, colors } from '../utils/colors.js'
import Gradient from 'ink-gradient'

const menu = ({ id, returnValue }) => {
	const { isFocused } = useFocus({ id })
	return (
		<Box
			borderStyle='round'
			borderColor={isFocused ? `${colors.primary}` : 'white'}
			borderDimColor={!isFocused}
			flexDirection='column'
		>
			<Box position='relative' marginTop='-1px' marginLeft='1px'>
				<Gradient name='morning'>
					<Text bold color={isFocused ? `${colors.primary}` : 'white'}>
						{hexColors.primary(' ' + 'Made For You' + ' ')}
					</Text>
				</Gradient>
			</Box>
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
				defaultValue='playlists'
			/>
		</Box>
	)
}

export default menu
