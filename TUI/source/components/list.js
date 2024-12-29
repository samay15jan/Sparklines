import React, { useEffect, useState } from 'react'
import { Box, Text, useFocus } from 'ink'
import { Select } from '@inkjs/ui'
import { hexColors, colors } from '../utils/colors.js'
import Gradient from 'ink-gradient'

const list = ({ id, menuLists, selectedMenu, returnId }) => {
	const { isFocused } = useFocus({ id })
	const [options, setOptions] = useState([])

	useEffect(() => {
		const updatedOptions = menuLists
			.filter((item) => item?.id === selectedMenu)
			.flatMap((item) => item?.data || [])
			.map((itemData) => ({
				label: itemData?.name?.slice(0, 30) || itemData?.title?.slice(0, 30),
				value: itemData.id,
			}))

		setOptions(updatedOptions)
	}, [menuLists, selectedMenu])

	const handleChange = (newId) => {
		const selectedMenuData = menuLists
			.filter((item) => item?.id === selectedMenu)
			.flatMap((item) => item?.data || [])
		const filteredData = selectedMenuData.find((item) => item.id === newId)
		returnId(filteredData?.id)
	}
	return (
		<>
			<Box
				flexDirection='column'
				borderColor={isFocused ? `${colors.primary}` : 'white'}
				borderDimColor={!isFocused}
				borderStyle='round'
			>
				<Box position='relative' marginTop='-1px' marginLeft='1px'>
				<Gradient name='morning'>
					<Text bold color={isFocused ? `${colors.primary}` : 'white'}>
					{hexColors.primary(' ' + 'Playlists' + ' ')}
					</Text>
					</Gradient>
				</Box>
				<Select
					visibleOptionCount={13}
					options={options}
					isDisabled={!isFocused}
					onChange={(newId) => {
						handleChange(newId)
					}}
					defaultValue={options[0]?.value}
				/>
			</Box>
		</>
	)
}

export default list
