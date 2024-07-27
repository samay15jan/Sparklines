import { useApp } from 'ink'
import fs from 'fs'
import os from 'os'
import path from 'path'

const apiKey = () => {
	const { exit } = useApp()

	try {
		const configPath = path.join(os.homedir(), '.sparklines', 'config')
		if (!configPath) {
			exit()
		}
		const apiKey = fs.readFileSync(configPath, 'utf8')
    const token = JSON.parse(apiKey)
		return token?.token
	} catch (error) {
    console.log('Unable to find api Key')
  }
}

export default apiKey
