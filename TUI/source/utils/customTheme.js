import { extendTheme, defaultTheme } from '@inkjs/ui'
import { colors } from '../utils/colors.js'
import figures from 'figures';

const customTheme = extendTheme(defaultTheme, {
	components: {
		Select: {
			styles: {
				selectedIndicator: () => ({
					color: colors.primary,
				}),
				focusIndicator: () => ({
					color: colors.primary,
				}),
				label({ isFocused, isSelected }) {
					let color
					let backgroundColor
					if (isSelected) {
						color = colors.primary
					}
					if (isFocused) {
						color = 'black'
						backgroundColor = 'gray'
					}
					return { color, backgroundColor }
				},
			},
		},
		MultiSelect: {
			styles: {
				selectedIndicator: () => ({
					color: colors.primary,
				}),
				focusIndicator: () => ({
					color: colors.primary,
				}),
				label({ isFocused, isSelected }) {
					let color
					let backgroundColor
					if (isSelected) {
						color = colors.primary
					}
					if (isFocused) {
						color = 'black'
						backgroundColor = 'gray'
					}
					return { color, backgroundColor }
				},
			},
		},
		ProgressBar: {
			styles: {
				completed: () => ({
					color: colors.primary,
				}),
			},
			config: () => ({
				completedCharacter: figures.square,
				remainingCharacter: figures.squareMediumShade,
			}),
		},
	},
})

export default customTheme
