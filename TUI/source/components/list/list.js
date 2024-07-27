import React, { useEffect, useState } from 'react'
import { Box } from 'ink'
import { Select } from '@inkjs/ui'

const list = ({ menuLists, selectedMenu, returnValue }) => {
	const [options, setOptions] = useState([])

	useEffect(() => {
		const updatedOptions = menuLists
			.filter((item) => item?.id === selectedMenu)
			.flatMap((item) => item?.data || [])
			.map((itemData) => ({
				label: itemData?.name?.slice(0, 30) || itemData?.title?.slice(0, 30),
				value: itemData,
			}))

		setOptions((prevOptions) => [...prevOptions, ...updatedOptions])
	}, [menuLists, selectedMenu])

	return (
		<Box flexDirection='column' marginRight={2}>
			<Select
				visibleOptionCount={13}
				options={options}
				onChange={(data) => {
					returnValue(data)
				}}
			/>
		</Box>
	)
}

export default list
