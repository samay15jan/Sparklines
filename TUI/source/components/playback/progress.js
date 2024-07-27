import React from 'react'
import { ProgressBar } from '@inkjs/ui'
import { Box, Text } from 'ink'
import path from 'path'
import os from 'os'
import { exec } from 'child_process'

const progress = ({ data }) => {
	// const logFileLocation = path.join(
	// 	os.homedir(),
	// 	'.sparklines',
	// 	'logs',
	// 	'mpv.log'
	// )

	// function getDuration(type) {
	// 	const menu = type === 'current' ? 'head -n 1' : 'tail -1'
	// 	const command = `cat ${logFileLocation} | grep A | tail -1 | grep -oP '\d{2}:\d{2}:\d{2}' | ${menu} | grep -oP '\d{2}:\d{2}$'`
	// 	const duration = exec(command, { stdio: ['ignore', 'pipe', 'ignore'] })
	// 	return duration.stdout
	// }

	// const currentTimestamp = getDuration('current')
	// const totalDuration = getDuration('total')

	return (
		<>
			<Box flexDirection='row' justifyContent='space-between' width={Infinity}>
				<Box marginLeft={2} marginTop={1}>
					<Text>{data?.songs[0]?.name || data?.songs[0]?.title}</Text>
					{/* <Text>{data?.songs[0]?.primaryArtist}</Text>
					<Text>{data?.songs[0]?.album?.title}</Text> */}
				</Box>
				<Box marginRight={2} marginTop={1}>
					<Text></Text>
				</Box>
			</Box>
			<Box borderDimColor borderStyle={'round'}>
				<ProgressBar value={10} />
			</Box>
		</>
	)
}

export default progress
