import React, { useState } from 'react'
import { Box } from 'ink'
import { Spinner } from '@inkjs/ui'
import { useFocusManager, useInput, useApp } from 'ink'
import List from './components/list.js'
import { HomepageData, PlaylistData } from './api/api.js'
import Auth from './components/auth.js'
import Simulation from './components/simulation.js'
import Progress from './components/progress.js'
import Playback from './components/playback.js'
import Menu from './components/menu.js'
import HelpBox from './components/helpBox.js'

const HandleFocus = () => {
	const { focus } = useFocusManager()
	const { exit } = useApp()

	useInput((input) => {
		if (input === 'a') {
			focus('menu')
		} else if (input === 's') {
			focus('list')
		} else if (input === 'd') {
			focus('simulation')
		} else if (input === 'q') {
			exit()
		}
	})

	return null
}

export default function App({ login, register }) {
	const [homepageData, setHomepageData] = useState(null)
	const [simulationData, setSimulationData] = useState(null)
	const [selectedMenu, setSelectedMenu] = useState('playlists')
	const [playingSongId, setPlayingSongId] = useState(null)
	const [homepageLoading, setHomepageLoading] = useState(true)
	const [playlistLoading, setPlaylistLoading] = useState(true)
	const [selectedPlaylistId, setPlaylistId] = useState(null)
	const [songFinished, isSongFinished] = useState(null)
	const [showHelp, setShowHelp] = useState(false)

	useInput((input) => {
		if (input === 'h') {
			setShowHelp(!showHelp)
		}
	})

	const menuLists = [
		{
			id: 'playlists',
			data: homepageData?.playlists,
		},
		{
			id: 'albums',
			data: homepageData?.albums,
		},
		{
			id: 'charts',
			data: homepageData?.charts,
		},
	]

	return (
		<Box flexDirection='column' borderDimColor width={Infinity} padding={2}>
			{register || login ? (
				<Box
					borderStyle='round'
					flexDirection='column'
					borderDimColor
					padding={2}
				>
					<Auth handleMenu={login ? 'login' : 'register'} />
				</Box>
			) : (
				<>
					{!showHelp ? (
						<>
							<Box flexDirection='row'>
								<Box flexDirection='column' borderDimColor width={36}>
									<Menu
										id='menu'
										returnValue={(value) => setSelectedMenu(value)}
									/>
									{homepageLoading ? (
										<Spinner type='dots' label='loading' />
									) : (
										<List
											id='list'
											menuLists={menuLists}
											selectedMenu={selectedMenu}
											returnId={(id) => setPlaylistId(id)}
										/>
									)}
								</Box>
								{playlistLoading ? (
									<Spinner type='dots' label='loading' />
								) : (
									<Simulation
										id='simulation'
										data={simulationData?.songs}
										returnPlaySongId={(id) => setPlayingSongId(id)}
										songFinished={songFinished}
									/>
								)}
							</Box>
						</>
					) : (
						<Box flexDirection='row' width={Infinity}>
							<HelpBox />
						</Box>
					)}
					<Progress
						playingSongId={playingSongId}
						simulationData={simulationData?.songs}
						isFinished={(value) => isSongFinished(value)}
					/>
				</>
			)}

			<Playback
				playingSongId={playingSongId}
				simulationData={simulationData?.songs}
			/>
			<PlaylistData
				playlistId={selectedPlaylistId}
				returnResponse={(data) => setSimulationData(data)}
				isLoading={(boolean) => setPlaylistLoading(boolean)}
			/>
			<HomepageData
				returnResponse={(data) => setHomepageData(data)}
				isLoading={(boolean) => setHomepageLoading(boolean)}
				defaultPlaylistId={(id) => setPlaylistId(id)}
			/>
			<HandleFocus />
		</Box>
	)
}
