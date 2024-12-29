#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import App from './app.js'

const cli = meow(
	`
		Usage
		  $ TUI

		Options
			--login
			--register

		Examples
		  $ TUI --login
		  ....
	`,
	{
		importMeta: import.meta,
		flags: {
      login: {
        type: 'boolean',
      },
      register: {
        type: 'boolean',
      }
    }
	}
)

render(<App login={cli.flags.login} register={cli.flags.register}/>)
