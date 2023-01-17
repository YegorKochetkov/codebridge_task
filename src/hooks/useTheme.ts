import React from 'react';
import { createTheme, useMediaQuery } from '@mui/material';

export function useTheme() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = React.useMemo(() => {
		const customTheme = createTheme({
			palette: {
				mode: prefersDarkMode ? 'dark' : 'light',
				...(prefersDarkMode
					? {
							textColors: {
								light: '#575757',
								main: '#363636',
								dark: '#b2b2b2',
								contrastText: '#ffffff',
							},
					  }
					: {
							textColors: {
								light: '#ffffff',
								main: '#ffffff',
								dark: '#000000',
								contrastText: '#363636',
							},
					  }),

				highlightColors: {
					light: '#fff747a1',
					main: '#fff619a1',
					dark: '#b2ac11a1',
					contrastText: '#363636',
				},
			},
			typography: {
				fontFamily: "'Montserrat', sans-serif",
			},
			breakpoints: {
				values: {
					mobile: 0,
					tablet: 768,
					laptop: 1024,
					desktop: 1440,
				},
			},
			shape: {
				borderRadius: 5,
			},
		});

		customTheme.shadows.push('0px 8px 24px rgba(0, 0, 0, 0.05)');

		return customTheme;
	}, [prefersDarkMode]);

	return { theme };
}
