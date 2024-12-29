import React, { useState, useEffect } from 'react'
import { Text, Newline, Box, useApp } from 'ink'
import { MultiSelect } from '@inkjs/ui'
import fs from 'fs'
import os from 'os'
import path from 'path'
import Gradient from 'ink-gradient'

const Language = () => {
  const { exit } = useApp()
  const [message, setMessage] = useState(null)
  const [languages, setLanguages] = useState()

  const configPath = path.join(os.homedir(), '.sparklines', 'config')

  function saveDataToFile(languages) {
    fs.readFile(configPath, 'utf8', (err, fileData) => {
      if (err && err.code !== 'ENOENT') {
        setMessage('Error reading file')
        exit()
      }

      let currentConfig = {}
      if (fileData) {
        try {
          currentConfig = JSON.parse(fileData)
        } catch (error) {
          setMessage('Error parsing file data')
          exit()
        }
      }

      currentConfig.languages = languages || []
      const dataString = JSON.stringify(currentConfig, null, 2)

      fs.mkdir(path.dirname(configPath), { recursive: true }, (err) => {
        if (err) {
          setMessage('Error creating directory')
          exit()
        }

        fs.writeFile(configPath, dataString, (err) => {
          if (err) {
            setMessage('Error writing data')
            exit()
          }
          setMessage('Successfully saved configuration.')
        })
				exit()
      })
    })
  }

  useEffect(() => {
    if (languages) {
      saveDataToFile(languages)
    }
  }, [languages])

  return (
    <Box flexDirection="column" borderDimColor padding={2} alignItems="center">
      <Gradient name="morning">
        <Text bold>
          Please select your desired language for recommendations.
        </Text>
      </Gradient>
      <Gradient name="morning">
        <Text>[You can select multiple languages too]</Text>
      </Gradient>
      <Newline />
      <Box
        borderDimColor
        borderStyle="round"
        width={30}
        flexDirection="column"
        padding={0}
        borderColor="#c69a67"
      >
        <MultiSelect
          options={[
            { label: 'English', value: 'english' },
            { label: 'Hindi', value: 'hindi' },
            { label: 'Punjabi', value: 'punjabi' },
            { label: 'Haryanvi', value: 'haryanvi' },
            { label: 'Telugu', value: 'telugu' },
            { label: 'Marathi', value: 'marathi' },
            { label: 'Gujarati', value: 'gujarati' },
            { label: 'Bengali', value: 'bengali' },
            { label: 'Rajasthani', value: 'rajasthani' },
          ]}
          highlightText
					onSubmit={(lang) => setLanguages(lang)}
        />
      </Box>
      {message && (
        <Gradient name="morning">
          <Text bold>{message}</Text>
        </Gradient>
      )}
    </Box>
  )
}

export default Language
