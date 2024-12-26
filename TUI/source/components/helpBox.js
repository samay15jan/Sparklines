import React from 'react'
import { Box, Text } from 'ink'

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
			<Box
	 			flexDirection='flex'
				alignItems='center'
			>
      	<Text bold align="center">
      	  ____ ___  ____ ____ _  _ _    _ _  _ ____ ____
      	</Text>
      	<Text bold align="center">
      	  [__  |__] |__| |__/ |_/  |    | |\ | |___ [__
      	</Text>
      	<Text bold align="center">
      	  ___] |    |  | |  \ | \_ |___ | | \| |___ ___]
      	</Text>
				<Box borderStyle='round'>
      	<Text color="black" backgroundColor='#c69a67' dimColor>
      	  The coolest way to stream your favorite music from terminal!
      	</Text>
				</Box>
			</Box>
			<Box flexDirection='flex' alignItems='center'>
				<Text color='cyan'>`a` to focus on menu section</Text>
				<Text color='cyan'>`s` to focus your playlists section</Text>
				<Text color='cyan'>`d` to focus on simulation section.</Text>
				<Text color='cyan'>`Tab` to navigate between sections.</Text>
				<Text color='cyan'>`Spacebar` to toggle between play and pause.</Text>
				<Text color='cyan'>`↑` and `↓`to navigate up and down between items.</Text>
				<Text color='cyan'>`Enter` to select the selected item.</Text>
				<Text color='cyan'>`]` to increase volume by 5.</Text>
				<Text color='cyan'>`[` to decrease volume by 5.</Text>
				<Text color='cyan'>`m` to mute/unmute the audio.</Text>
				<Text color='cyan'>`Ctrl + Right Arrow` to seek forward 5 seconds.</Text>
				<Text color='cyan'>`Ctrl + Left Arrow` to seek backward 5 seconds.</Text>
				<Text color='cyan'>`Ctrl + Right Arrow` to increase speed by 0.2x.</Text>
				<Text color='cyan'>`Ctrl + Left Arrow` to decrease speed by 0.2x.</Text>
				<Text color="cyan">`h` to display/close this help menu.</Text>
				<Text color='cyan'>`q` to quit the app.</Text>
			</Box>
		</Box>
	)
}

export default HelpBox
