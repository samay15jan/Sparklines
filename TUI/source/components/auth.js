import React, { useState } from 'react'
import { Text, Newline, Box, useApp } from 'ink'
import { PasswordInput, EmailInput } from '@inkjs/ui'
import axios from 'axios'
import fs from 'fs'
import os from 'os'
import path from 'path'

const auth = ({ handleMenu }) => {
	const { exit } = useApp()
	const [type, setType] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)

	const handleRegistration = async () => {
		try {
			if (!email.length > 0 || !password.length > 0) {
				setErrorMessage('Error: Fields cannot be empty')
				return
			}
			const userData = { email: email, password: password }
			const registeredUser = await axios.post(
				'https://sparklines-backend.vercel.app/auth/register',
				userData
			)
			if (registeredUser.data) {
				const response = await axios.post(
					'https://sparklines-backend.vercel.app/auth/login',
					userData
				)
				const authToken = { Authorization: `Bearer ${response.data.data}` }
				const loggedInUser = await axios.get(
					'https://sparklines-backend.vercel.app/user/profile',
					{
						headers: authToken,
					}
				)
				if (loggedInUser.data) {
					const userData = {
						userId: loggedInUser.data.data.userId,
						expiry: 'never',
					}
					const apiToken = await axios.post(
						'https://sparklines-backend.vercel.app/token/generate',
						userData
					)
					setSuccessMessage(loggedInUser.data.message)
					saveDataToFile({ token: apiToken.data.data.apiKey })
				}
			} else {
				setErrorMessage('Error: Failed to create account')
			}
		} catch (error) {
			setErrorMessage('Error: Server Error')
			return
		}
	}

	const handleLogin = async () => {
		try {
			if (!email.length > 0 || !password.length > 0) {
				setErrorMessage('Error: Fields cannot be empty')
				return
			}
			const userData = { email: email, password: password }
			const response = await axios.post(
				'https://sparklines-backend.vercel.app/auth/login',
				userData
			)
			const authToken = { Authorization: `Bearer ${response.data.data}` }
			const loggedInUser = await axios.get(
				'https://sparklines-backend.vercel.app/user/profile',
				{
					headers: authToken,
				}
			)
			if (loggedInUser.data) {
				const userData = {
					userId: loggedInUser.data.data.userId,
					expiry: 'never',
				}
				const apiToken = await axios.post(
					'https://sparklines-backend.vercel.app/token/generate',
					userData
				)
				setSuccessMessage(loggedInUser.data.message)
				saveDataToFile({ apiKey: apiToken.data.data.apiKey })
			}
		} catch (error) {
			setErrorMessage('Error: ', error)
			return
		}
	}

	function saveDataToFile(data) {
		const configPath = path.join(os.homedir(), '.sparklines', 'config')
		const dataString = JSON.stringify(data, null, 2)

		fs.mkdir(path.dirname(configPath), { recursive: true }, (err) => {
			if (err) {
				setSuccessMessage('Error creating API location')
				exit()
			}

			fs.writeFile(configPath, dataString, (err) => {
				if (err) {
					setSuccessMessage('Error writing API key')
					exit()
				}
				setSuccessMessage(`Success`)
			})
		})
	}

	return (
		<Box flexDirection='column' alignItems='center'>
			<Text bold>Welcome to Sparklines!</Text>
			<Text>Embrace the Rhythm of Your Soul</Text>
			<Text>[{handleMenu}]</Text>
			<Newline />
			<Box
				borderDimColor
				borderStyle='round'
				width={30}
				flexDirection='column'
				padding={0}
			>
				{type ? (
					<EmailInput
						placeholder='Enter Email...'
						value={email}
						onChange={(value) => setEmail(value)}
						onSubmit={() => setType(!type)}
					/>
				) : (
					<PasswordInput
						placeholder='Enter password...'
						value={password}
						onChange={(value) => setPassword(value)}
						onSubmit={
							handleMenu === 'register' ? handleRegistration : handleLogin
						}
					/>
				)}
			</Box>
			<>
				{errorMessage === null ? (
					<Text color='red' bold>
						{errorMessage}
					</Text>
				) : (
					<Text color='green' bold>
						{successMessage}
					</Text>
				)}
			</>
		</Box>
	)
}

export default auth