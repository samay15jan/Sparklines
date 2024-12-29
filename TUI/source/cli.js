#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import App from './app.js'

const cli = meow(
	`
		Usage
		  $ sparklines-tui

		Options
		  --login, -l       Log in to the application
		  --register, -r    Register a new account
		  --help, -h        Show this help message

		Examples
		  $ sparklines-tui --login
		  $ sparklines-tui --register
		  $ sparklines-tui --help

		For more information, refer github repository at https://github.com/samay15jan/sparklines
	`,
	{
		importMeta: import.meta,
		flags: {
			login: {
				type: 'boolean',
				shortFlag: 'l',
			},
			register: {
				type: 'boolean',
				shortFlag: 'r',
			},
			help: {
				type: 'boolean',
				shortFlag: 'h',
			},
		},
	}
)

if (cli.flags.help) {
	console.log(`
	Usage: sparklines-tui <command> [options]

	Options:
		--login, -l       Log in to the application
		--register, -r    Register a new account
		--help, -h        Show this help message

	Examples:
		$ sparklines-tui --login      Log in to the app
		$ sparklines-tui --register   Register a new user
		$ sparklines-tui --help       Show this help message

	More about commands:
		--login:
			Use this option if you already have an account and want to log in.

		--register:
			Use this option if you are a new user and wish to register.

		For more information, refer github repository at https://github.com/samay15jan/sparklines
	`)
	process.exit(0)
}

render(<App login={cli.flags.login} register={cli.flags.register} />)
