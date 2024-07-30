import React, { useEffect, useState } from 'react'
import { Box, useFocus } from 'ink'
import { Select } from '@inkjs/ui'

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
		<Box
			flexDirection='column'
			borderColor={isFocused ? '#c69a67' : ''}
			borderDimColor={!isFocused}
			borderStyle='round'
		>
			<Select
				visibleOptionCount={13}
				options={options}
				isDisabled={!isFocused}
				onChange={(newId) => {
					handleChange(newId)
				}}
			/>
		</Box>
	)
}

export default list
