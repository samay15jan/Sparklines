import { exec } from 'child_process'
import fs from 'fs'
import { useInput } from 'ink'
import os from 'os'
import path from 'path'
import React, { useEffect, useRef, useState } from 'react'

const socketPath = `${os.homedir()}/.sparklines/socket.sock`
const logFileLocation = path.join(
	os.homedir(),
	'.sparklines',
	'logs',
	'mpv.log'
)

const ensureLogDirectory = (dir) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}
}

const Playback = ({ homeSongId, searchSongId, simulationData, searchData }) => {
	const pidRef = useRef(null)
	const [playingSong, setPlayingSong] = useState()
	const url =
		playingSong?.downloadUrl[4]?.link ||
		playingSong?.downloadUrl[3]?.link ||
		playingSong?.downloadUrl[2]?.link ||
		playingSong?.downloadUrl[1]?.link ||
		playingSong?.downloadUrl[0]?.link

	useEffect(() => {
		setPlayingSong(searchData)
	}, [searchData, searchSongId])

	useEffect(() => {
		setPlayingSong(simulationData?.find((song) => song?.id === homeSongId))
	}, [simulationData, homeSongId])

	useEffect(() => {
		ensureLogDirectory(path.dirname(logFileLocation))

		const logFile = fs.createWriteStream(logFileLocation)

		if (pidRef.current) {
			exec(`kill ${pidRef.current}`, (error) => {
				if (error) {
					console.error(`Error killing process: ${error}`)
				}
			})
		}

		if (url) {
			const command = `mpv --no-video --input-ipc-server=${socketPath} ${url}`
			const child = exec(command, { stdio: ['ignore', 'pipe', 'pipe'] })
			pidRef.current = child.pid

			child.stdout.pipe(logFile)
			child.stderr.pipe(logFile)

			return () => {
				exec(`kill ${pidRef.current}`, (error) => {
					if (error) {
						console.error(`Error stopping process: ${error}`)
					}
				})
				pidRef.current = null
				logFile.end()
			}
		}
	}, [url])

	useEffect(() => {
		return () => {
			if (pidRef.current) {
				console.log('Stopping mpv on unmount...')
				exec(`kill ${pidRef.current}`, (error) => {
					if (error) {
						console.error(`Error stopping process: ${error}`)
					}
				})
			}
		}
	}, [])

	const HandlePlaybackControl = () => {
		useInput((input, key) => {
			if (input === ' ') {
				const command = `echo '{"command": ["cycle", "pause"]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (!key.ctrl && key.rightArrow) {
				const command = `echo '{"command": ["seek", 5, "relative"]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (!key.ctrl && key.leftArrow) {
				const command = `echo '{"command": ["seek", -5, "relative"]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (input === ']') {
				const command = `echo '{"command": ["add", "volume", 5]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (input === '[') {
				const command = `echo '{"command": ["add", "volume", -5]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (key.ctrl && input === 'm') {
				const command = `echo '{"command": ["cycle", "mute"]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (key.ctrl && key.rightArrow) {
				const command = `echo '{"command": ["add", "speed", 0.2]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			} else if (key.ctrl && key.leftArrow) {
				const command = `echo '{"command": ["add", "speed", -0.2]}' | socat - UNIX-CONNECT:${socketPath}`
				exec(command)
			}
		})
	}

	return <HandlePlaybackControl />
}

export default Playback
