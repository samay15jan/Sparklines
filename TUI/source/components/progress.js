import React, { useEffect, useState, useRef } from 'react'
import { ProgressBar } from '@inkjs/ui'
import { Box, Text } from 'ink'
import fs from 'fs'
import path from 'path'
import os from 'os'
import figures from 'figures'
import Gradient from 'ink-gradient'

const Progress = ({
	homeSongId,
	searchSongId,
	simulationData,
	isFinished,
	searchData,
}) => {
	const startTimeRef = useRef('00:00:00')
	const endTimeRef = useRef('00:00:00')
	const percentageRef = useRef('0%')
	const [error, setError] = useState('')
	const [progress, setProgress] = useState(0)
	const [scrollingText, setScrollingText] = useState('')
	const [playing, setPlaying] = useState(false)
	const [playingSong, setPlayingSong] = useState('')

	useEffect(() => {
		setPlayingSong(searchData)
	}, [searchData, searchSongId])

	useEffect(() => {
		setPlayingSong(simulationData?.find((song) => song?.id === homeSongId))
	}, [simulationData, homeSongId])

	// Log file processing to timestamps
	useEffect(() => {
		const logFileLocation = path.join(
			os.homedir(),
			'.sparklines',
			'logs',
			'mpv.log'
		)

		const processLogFile = (data) => {
			const lines = data.split('\n')
			const latestLine = lines[lines.length - 1]
			const regex = /(\d{2}:\d{2}:\d{2}) \/ (\d{2}:\d{2}:\d{2}) \((\d+%)\)/
			const match = latestLine.match(regex)

			if (match) {
				startTimeRef.current = match[1]
				endTimeRef.current = match[2]
				percentageRef.current = match[3]
				const percentageValue = parseInt(match[3].replace('%', ''), 10)
				setProgress(percentageValue)
			}
		}

		const interval = setInterval(() => {
			fs.readFile(logFileLocation, 'utf8', (err, data) => {
				if (err) {
					setError('Error reading log file: ' + err.message)
					return
				}
				processLogFile(data)
			})
		}, 500)

		return () => {
			clearInterval(interval)
		}
	}, [])

	// Scroll text
	useEffect(() => {
		const text =
			(playingSong?.name?.split('(')[0] || playingSong?.title || 'unknown') +
			' - ' +
			(playingSong?.primaryArtists?.split(', ')[0] || 'unknown') +
			' - ' +
			(playingSong?.album?.name.split('(')[0] || 'unknown')

		function scrollText(text, maxWidth, delay) {
			let index = 0
			const scrollInterval = setInterval(() => {
				const visibleText = text.slice(index, index + maxWidth)
				setScrollingText(visibleText)
				index += 1
				if (index >= text.length) {
					index = 0
				}
			}, delay)

			return scrollInterval
		}

		if (playingSong) {
			setPlaying(true)
			const scrollInterval = scrollText(text, 40, 500)
			return () => clearInterval(scrollInterval)
		} else {
			setPlaying(false)
		}
	}, [playingSong])

	// Handing playback status
	useEffect(() => {
		if (progress == 100) {
			isFinished(true)
		} else isFinished(false)
	}, [progress])

	return (
		<>
			<Box flexDirection='row' justifyContent='space-between' width={Infinity}>
				<Box marginLeft={2} marginTop={1}>
					<Gradient name='morning'>
						<Text>{playing && figures.play}</Text>
					</Gradient>
					<Gradient name='morning'>
						<Text>
							{playing ? scrollingText || 'Loading...' : 'Not Playing'}
						</Text>
					</Gradient>
				</Box>
				<Box marginRight={2} marginTop={1}>
					<Gradient name='morning'>
						<Text>
							{startTimeRef.current} - {endTimeRef.current} -{' '}
							{`(${percentageRef.current})`}
						</Text>
					</Gradient>
				</Box>
			</Box>
			<Box borderDimColor borderStyle={'round'}>
				<ProgressBar value={progress} />
			</Box>
			{error && (
				<Gradient name='morning'>
					<Box marginTop={1}>
						<Text color='red'>{error}</Text>
					</Box>
				</Gradient>
			)}
		</>
	)
}

export default Progress
