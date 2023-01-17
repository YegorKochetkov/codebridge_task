import React, { Fragment, memo } from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import ArticleCard from './ArticleCard';
import Paginator from './Paginator';
import { usePagination } from '../hooks/usePagination';

const articlesListStyles: SxProps = {
	display: 'grid',
	gridTemplateColumns: {
		mobile: 'auto',
		tablet: 'auto auto',
		desktop: 'repeat(3, auto)'
	},
	justifyContent: 'center',
	gap: 'var(--articleCardGap)',

	marginBottom: '2rem'
};

const filterResultsStyles: SxProps = {
	maxWidth: {
		mobile: 'var(--articleCardMaxWidth)',
		tablet: 'calc(var(--articleCardMaxWidth) * 2 + var(--articleCardGap))',
		desktop: 'calc(var(--articleCardMaxWidth) * 3 + var(--articleCardGap) * 2)'
	},
	margin: '0 auto',
	marginBottom: 'var(--articleCardGap)',
	paddingBottom: '0.3rem',

	borderBottom: 'var(--boxBorder)',

	lineHeight: '1.25rem',
	fontWeight: 600
};

const listAnimation = {
	visible: (index: number) => ({
		opacity: 1,
		transition: {
			delay: index * 0.2
		}
	}),
	hidden: { opacity: 0 }
};

function ArticlesList () {
	const { visibleArticles, filteredArticles, itemsPerPage, currPage } =
		usePagination();

	return (
		<Fragment>
			<Typography sx={filterResultsStyles} component='p'>
				Results: {filteredArticles?.length}
			</Typography>

			<Box sx={articlesListStyles}>
				{visibleArticles?.map((article, index) => (
					<motion.span
						key={article.id}
						variants={listAnimation}
						initial='hidden'
						animate='visible'
						custom={index}
					>
						<ArticleCard id={article.id} key={article.id} />
					</motion.span>
				))}
			</Box>
			<Paginator
				items={filteredArticles?.length || 0}
				itemsPerPage={itemsPerPage}
				currPage={currPage}
			/>
		</Fragment>
	);
}

export default memo(ArticlesList);
