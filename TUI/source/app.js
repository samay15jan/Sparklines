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
import { ThemeProvider } from '@inkjs/ui'
import customTheme from './utils/customTheme.js'
import Toggleable from './components/Toggleable.js'
import Language from './components/language.js'

const HandleFocus = () => {
	const { focus } = useFocusManager()
	const { exit } = useApp()

	useInput((input, key) => {
		if (key.ctrl && input === 'a') {
			focus('menu')
		} else if (key.ctrl && input === 's') {
			focus('list')
		} else if (key.ctrl && input === 'd') {
			focus('simulation')
		} else if (key.ctrl && input === 'f') {
			focus('toggleable')
		} else if (key.escape) {
			exit()
		}
	})

	return null
}

export default function App({ login, register, lang }) {
	const [homepageData, setHomepageData] = useState(null)
	const [showAuth, setShowAuth] = useState(true)
	const [simulationData, setSimulationData] = useState(null)
	const [selectedMenu, setSelectedMenu] = useState('playlists')
	const [homeSongId, setHomeSongId] = useState(null)
	const [searchSongId, setSearchSongId] = useState(null)
	const [homepageLoading, setHomepageLoading] = useState(true)
	const [playlistLoading, setPlaylistLoading] = useState(true)
	const [selectedPlaylistId, setPlaylistId] = useState(null)
	const [songFinished, isSongFinished] = useState(null)
	const [showHelp, setShowHelp] = useState(false)
	const [searchData, setSearchData] = useState(null)

	useInput((input, key) => {
		if (key.meta && input === 'h') {
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
		<ThemeProvider theme={customTheme}>
			<Box
				flexDirection='column'
				borderDimColor
				width={Infinity}
				padding={2}
				height='100%'
			>
				{register || login ? (
					<Box
						borderStyle='round'
						flexDirection='column'
						borderDimColor
						padding={2}
						borderColor='#c69a67'
						width='100%'
						height='100%'
						alignItems='center'
					>
						{showAuth ? (
							<Auth
								handleMenu={login ? 'login' : 'register'}
								setShowAuth={(bool) => setShowAuth(bool)}
							/>
						) : (
							<Language />
						)}
					</Box>
				) : (
					<>
						{!showHelp ? (
							<>
								<Box flexDirection='row'>
									<Box flexDirection='column' borderDimColor width='40%'>
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
									<Box flexDirection='row' borderDimColor width='60%'>
										{playlistLoading ? (
											<Spinner type='dots' label='loading' />
										) : (
											<Simulation
												id='simulation'
												data={simulationData?.songs}
												returnPlaySongId={(id) => setHomeSongId(id)}
												songFinished={songFinished}
											/>
										)}
										<Toggleable
											id='toggleable'
											returnSongId={(id) => setSearchSongId(id)}
											returnSongData={(data) => setSearchData(data)}
										/>
									</Box>
								</Box>
							</>
						) : (
							<Box flexDirection='row' width={Infinity}>
								<HelpBox />
							</Box>
						)}
						<Progress
							homeSongId={homeSongId}
							searchSongId={searchSongId}
							simulationData={simulationData?.songs}
							isFinished={(value) => isSongFinished(value)}
							searchData={searchData}
						/>
					</>
				)}
				{!(register || login) && (
					<>
						<Playback
							homeSongId={homeSongId}
							searchSongId={searchSongId}
							simulationData={simulationData?.songs}
							searchData={searchData}
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
					</>
				)}
				<HandleFocus />
			</Box>
		</ThemeProvider>
	)
}
