import React, { memo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { SxProps } from '@mui/material';

interface PaginatorProps {
	items: number;
	itemsPerPage: number;
	currPage: number;
}

const paginationStyles: SxProps = {
	margin: '0 auto',
	maxWidth: 'fit-content',
};

function Paginator({ items, itemsPerPage, currPage }: PaginatorProps) {
	if (!items) return null;

	const pagesCount = Math.ceil(items / itemsPerPage);
	const [searchParams] = useSearchParams();
	const filterFromParams =
		searchParams.get('filter') !== null ? searchParams.get('filter') : '';

	return (
		<Pagination
			sx={paginationStyles}
			page={currPage}
			count={pagesCount}
			variant='outlined'
			shape='rounded'
			renderItem={(item) => (
				<PaginationItem
					component={Link}
					to={`/articles?page=${item.page}&filter=${filterFromParams}`}
					{...item}
				/>
			)}
		/>
	);
}

export default memo(Paginator);
