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
		const key = fs.readFileSync(configPath, 'utf8')
    const token = JSON.parse(key)
		return token?.apiKey
	} catch (error) {
    console.log('Unable to find api Key. Read help menu for more details with `sparklines -h`')
  }
}

export default apiKey
