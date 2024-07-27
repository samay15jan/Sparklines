import React, { useEffect, useState } from 'react'
import { Box } from 'ink'
import Auth from './components/auth/auth.js'
import Simulation from './components/simulation/simulation.js'
import Progress from './components/playback/progress.js'
import Main from './components/simulation/main.js'

export default function App({ login, register }) {
	const [mainData, setMainData] = useState()
	const [id, setId] = useState()

	//Hide warning
	process.on('warning', (warning) => {})

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
					<Box flexDirection='row'>
						<Simulation
							returnValue={(id) => setId(id)}
							returnMainData={(data) => setMainData(data)}
						/>
						<Main data={mainData} />
					</Box>
					<Progress data={mainData} />
				</>
			)}
		</Box>
	)
}
