import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, SxProps, ThemeProvider } from '@mui/material';

import ArticlesList from './components/ArticlesList';
import ErrorMessage from './components/ErrorMessage';
import useArticlesStore from './store';
import Filter from './components/Filter';
import { useTheme } from './hooks/useTheme';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: false;
		sm: false;
		md: false;
		lg: false;
		xl: false;
		mobile: true;
		tablet: true;
		laptop: true;
		desktop: true;
	}
	interface Palette {
		textColors: Palette['primary'];
		highlightColors: Palette['primary'];
	}

	interface PaletteOptions {
		textColors: PaletteOptions['primary'];
		highlightColors: PaletteOptions['primary'];
	}
}

const appStyles: SxProps = {
	minHeight: '100vh',

	padding: {
		mobile: 'var(--appPaddingsMobile)',
		tablet: 'var(--appPaddingsTablet)',
		desktop: 'var(--appPaddings)',
	},
};

function App() {
	const articles = useArticlesStore((state) => state.articles);
	const fetchError = useArticlesStore((state) => state.fetchError);
	const loadArticles = useArticlesStore((state) => state.loadArticles);
	const { theme } = useTheme();

	useEffect(() => {
		if (articles === null) {
			loadArticles();
		}
	}, []);

	if (fetchError !== null) {
		return (
			<ErrorMessage
				error={
					<>
						<p>Something went wrong.</p>
						<p>{fetchError}</p>
					</>
				}
			/>
		);
	}

	if (articles === null) {
		return (
			<CircularProgress
				sx={{ display: 'block', margin: '0 auto', marginTop: '5rem' }}
			/>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={appStyles}>
				<Filter />
				<ArticlesList />
			</Box>
		</ThemeProvider>
	);
}

export default App;
