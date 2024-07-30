import React, { useEffect, useState } from 'react'
import { ProgressBar } from '@inkjs/ui'
import { Box, Text } from 'ink'
import fs from 'fs'
import path from 'path'
import os from 'os'

const progress = ({ playingSongId, simulationData }) => {
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')
	const [percentage, setPercentage] = useState('')
	const [error, setError] = useState('')
	const playingSong = simulationData?.find(
		(song) => song?.id === playingSongId
	)

	const logFileLocation = path.join(
		os.homedir(),
		'.sparklines',
		'logs',
		'mpv.log'
	)

	return (
		<>
			<Box flexDirection='row' justifyContent='space-between' width={Infinity}>
				<Box marginLeft={2} marginTop={1}>
					<Text>
						{playingSong?.name || playingSong?.title || 'unknown'} - {''}
						{playingSong?.primaryArtists || 'unknown'} - {''}
						{playingSong?.album?.name || 'unknown'}
					</Text>
				</Box>
				<Box marginRight={2} marginTop={1}>
					<Text>
						{startTime || '00:00'} - {endTime || '00:00'} -{' '}
						{percentage || '00:00'}
					</Text>
				</Box>
			</Box>
			<Box borderDimColor borderStyle={'round'}>
				<ProgressBar value={10} />
			</Box>
		</>
	)
}

export default progress
