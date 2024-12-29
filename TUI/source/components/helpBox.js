import React from 'react'
import { Box, Text } from 'ink'
import Gradient from 'ink-gradient'
import BigText from 'ink-big-text'

const HelpBox = () => {
	return (
		<Box
			flexDirection='flex'
			justifyContent='center'
			alignItems='center'
			borderStyle='round'
			borderColor='#c69a67'
			width='100%'
		>
			<Box flexDirection='flex' alignItems='center'>
				<Gradient name='morning'>
					<BigText text='Sparklines-TUI' font='tiny' />
				</Gradient>
				<Gradient name='morning'>
					<Text color='black' backgroundColor='#c69a67' dimColor>
						The coolest way to stream your favorite music from terminal!
					</Text>
				</Gradient>
			</Box>
			<Gradient name='morning'>
				-----------------------------------------------------------
			</Gradient>
			<Box flexDirection='flex' alignItems='center'>
				<Gradient name='morning'>
					<Text>`Tab` to navigate between sections.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`Spacebar` to toggle between play and pause.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`Enter` to select the selected item.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`Ctrl + m` to mute/unmute the audio.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`Ctrl + x` to hide other section.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`Ctrl + z` to toggle search.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>
						`Ctrl + a/s/d/f` to focus on menu/playlists/simulation/other section
					</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>
						`Ctrl + k/l/;` to toggle between search/lyrics/queue section.
					</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`↑` and `↓`to navigate up and down between items.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`]` or `[` to increase/decrease volume by 5.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>
						`Ctrl + ➡` or `Ctrl + ⬅` to seek forward/backend by 5 seconds.
					</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>
						`Ctrl + ➡` or `Ctrl + ⬅` to increase/decrease speed by 0.2x.
					</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`alt + h` to display/close this help menu.</Text>
				</Gradient>
				<Gradient name='morning'>
					<Text>`esc` to quit the app.</Text>
				</Gradient>
			</Box>
		</Box>
	)
}

export default HelpBox
