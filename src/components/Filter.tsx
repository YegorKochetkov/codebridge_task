import React, { memo, useEffect, useState } from 'react';
import { Box, InputBase, Paper, SxProps, Typography } from '@mui/material';
import useArticlesStore from '../store';
import { useNavigate, useSearchParams } from 'react-router-dom';

const filterContainerStyles: SxProps = {
	maxWidth: {
		mobile: 'var(--articleCardMaxWidth)',
		tablet: 'calc(var(--articleCardMaxWidth) * 2 + var(--articleCardGap))',
		desktop: 'calc(var(--articleCardMaxWidth) * 3 + var(--articleCardGap) * 2)',
	},
	margin: '0 auto',
};

const filterFormStyles: SxProps = {
	display: 'flex',
	alignItems: 'center',
	gap: '1.25rem',

	padding: '0 1.25rem',
	marginTop: '0.625rem',
	marginBottom: '2.5rem',

	width: '100%',
	maxWidth: '37.5rem',

	color: 'textColors.light',
	backgroundColor: 'textColors.main',

	border: 'var(--boxBorder)',
	boxShadow: '25',

	'&:hover': {
		boxShadow: '0',
	},

	'@media (prefers-color-scheme: dark)': {
		'& svg path': {
			fill: '#fff',
		},
	},
};

const filterInputField: SxProps = {
	'&>input': {
		height: '3.12rem',
		padding: 0,

		color: 'theme.textColors.light',
	},
};

const filterLabelStyles: SxProps = {
	lineHeight: '1.25rem',
	fontWeight: 600,
};

function Filter() {
	const [query, setQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	const setFilter = useArticlesStore((state) => state.setFilter);
	const [searchParams] = useSearchParams();
	const filterFromParams = searchParams.get('filter');
	const pageFromParams = searchParams.get('page');

	const navigate = useNavigate();

	useEffect(() => {
		if (filterFromParams !== null) {
			setQuery(filterFromParams);
			setDebouncedQuery(filterFromParams);
		}
	}, [searchParams]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedQuery(() => query);
		}, 500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [query]);

	useEffect(() => {
		setFilter(debouncedQuery.toLowerCase());
		navigate(`articles?page=${pageFromParams}&filter=${debouncedQuery}`);
	}, [debouncedQuery]);

	return (
		<Box sx={filterContainerStyles}>
			<Typography sx={filterLabelStyles} component='label' htmlFor='filter'>
				Filter by keywords
			</Typography>

			<Paper sx={filterFormStyles}>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15.7832 14.3911L20 18.6069L18.6069 20L14.3911 15.7832C12.8224 17.0407 10.8713 17.7246 8.86088 17.7218C3.96968 17.7218 0 13.7521 0 8.86088C0 3.96968 3.96968 0 8.86088 0C13.7521 0 17.7218 3.96968 17.7218 8.86088C17.7246 10.8713 17.0407 12.8224 15.7832 14.3911ZM13.8082 13.6605C15.0577 12.3756 15.7555 10.6532 15.7527 8.86088C15.7527 5.05267 12.6681 1.96909 8.86088 1.96909C5.05267 1.96909 1.96909 5.05267 1.96909 8.86088C1.96909 12.6681 5.05267 15.7527 8.86088 15.7527C10.6532 15.7555 12.3756 15.0577 13.6605 13.8082L13.8082 13.6605Z'
						fill='#575757'
					/>
				</svg>

				<InputBase
					sx={filterInputField}
					placeholder='Search...'
					inputProps={{ 'aria-label': 'filter by keywords' }}
					id='filter'
					autoFocus
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
					}}
					fullWidth
				/>
			</Paper>
		</Box>
	);
}

export default memo(Filter);
