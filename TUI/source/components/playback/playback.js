import { useEffect, useRef } from 'react'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'

const ensureLogDirectory = (dir) => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}
}

const Playback = ({ url }) => {
	const pidRef = useRef(null)

	useEffect(() => {
		const logFileLocation = path.join(
			os.homedir(),
			'.sparklines',
			'logs',
			'mpv.log'
		)
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
			const command = `mpv --no-video ${url}`
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

	return null
}

export default Playback
