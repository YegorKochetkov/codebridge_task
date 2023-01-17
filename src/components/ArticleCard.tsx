import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
	CardActionArea,
	CardActions,
	Link,
	SxProps,
	Typography,
} from '@mui/material';
import Highlighter from 'react-highlight-words';

import useArticlesStore from '../store';
import { dateFormatter } from '../helpers/dateFormatter';
import { stringTrunc } from '../helpers/stringTrunc';

const articleStyles: SxProps = {
	display: 'grid',
	gridTemplateRows: '1fr min-content',

	maxWidth: 'var(--articleCardMaxWidth)',
	minWidth: 'var(--articleCardMinWidth)',

	color: 'textColors.contrastText',
	backgroundColor: 'textColors.main',

	border: 'var(--boxBorder)',
	boxShadow: '25',
};

const articleActionAreaStyles: SxProps = {
	display: 'grid',
	gridTemplateRows: 'auto 1fr',
	justifySelf: 'stretch',
};

const articleImgStyles: SxProps = {
	height: '13.56rem',
	width: '100%',

	objectPosition: 'center',
	objectFit: 'cover',
};

const articleContentStyles: SxProps = {
	display: 'grid',
	gridTemplateRows: 'min-content 1fr min-content',

	height: '100%',
	padding: '1.56rem 1.56rem 0rem',

	'& mark': {
		backgroundColor: 'var(--highlightMainColor)',
	},
};

const articleCardActionsStyles: SxProps = {
	padding: '1.25rem 1.56rem 1.56rem',
};

const articleDateStyles: SxProps = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',

	marginBottom: '1.55rem',

	opacity: '0.6',

	lineHeight: '1.31rem',
	fontSize: '0.875rem',

	'@media (prefers-color-scheme: dark)': {
		'& svg path': {
			stroke: '#fff',
		},
	},
};

const articleTitleStyles: SxProps = {
	display: '-webkit-box',

	WebkitLineClamp: '2',
	WebkitBoxOrient: 'vertical',

	overflow: 'hidden',
	textOverflow: 'ellipsis',

	margin: '0',
	marginBottom: '1.25rem',

	fontSize: '1.5rem',
	fontWeight: '400',
	lineHeight: '1.81rem',
};

const articleTextStyles: SxProps = {
	margin: '0',
	minHeight: '6rem',
};

const articleLinkStyles: SxProps = {
	display: 'flex',
	alignItems: 'baseline',
	gap: '0.37rem',

	fontWeight: '700',

	'@media (prefers-color-scheme: dark)': {
		'& svg path': {
			fill: '#fff',
		},
	},
};

interface ArticleProps {
	id: number;
}

function ArticleCard({ id }: ArticleProps) {
	const article = useArticlesStore((state) => state.getArticle(id));
	const filter = useArticlesStore((state) => state.filter);

	return (
		article && (
			<Card sx={articleStyles} component='article' key={article.id}>
				<CardActionArea
					component={RouterLink}
					to={`/article/${article.id}`}
					sx={articleActionAreaStyles}
				>
					<CardMedia
						component='img'
						image={article.imageUrl}
						alt={article.title}
						sx={articleImgStyles}
					/>
					<CardContent sx={articleContentStyles}>
						<Typography sx={articleDateStyles} component='div'>
							<svg
								width='16'
								height='16'
								viewBox='0 0 16 16'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<g opacity='0.6' clipPath='url(#clip0_466_331)'>
									<path
										d='M12 2.66675H3.99999C2.52724 2.66675 1.33333 3.86066 1.33333 5.33341V12.0001C1.33333 13.4728 2.52724 14.6667 3.99999 14.6667H12C13.4728 14.6667 14.6667 13.4728 14.6667 12.0001V5.33341C14.6667 3.86066 13.4728 2.66675 12 2.66675Z'
										stroke='#363636'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M5.33333 1.33337V4.00004'
										stroke='#363636'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M10.6667 1.33337V4.00004'
										stroke='#363636'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M1.33333 6.66675H14.6667'
										stroke='#363636'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</g>
								<defs>
									<clipPath id='clip0_466_331'>
										<rect width='16' height='16' fill='white' />
									</clipPath>
								</defs>
							</svg>
							{dateFormatter(article.publishedAt)}
						</Typography>
						<Typography sx={articleTitleStyles} component='h2'>
							<Highlighter
								searchWords={filter !== null ? filter.split(' ') : []}
								autoEscape={true}
								textToHighlight={article.title}
							/>
						</Typography>
						<Typography sx={articleTextStyles} component='p'>
							<Highlighter
								searchWords={filter !== null ? filter.split(' ') : []}
								autoEscape={true}
								textToHighlight={stringTrunc(article.summary, 100)}
							/>
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions sx={articleCardActionsStyles}>
					<Link
						component={RouterLink}
						to={`/article/${article.id}`}
						underline='hover'
						color='inherit'
						sx={articleLinkStyles}
					>
						<span>Read more</span>
						<svg
							width='12'
							height='10'
							viewBox='0 0 12 10'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								fill='#363636'
								d='M6.66829 0.162658C6.45593 0.379657 6.45593 0.730251 6.66975 0.945773L9.09665 3.39845L9.15268 3.448C9.36701 3.61309 9.6729 3.59589 9.86756 3.39698C9.97375 3.28848 10.0268 3.1475 10.0268 3.00653C10.0268 2.86407 9.97375 2.72236 9.86611 2.61386L7.43993 0.161182L7.38388 0.111806C7.16946 -0.0527212 6.86296 -0.0355811 6.66829 0.162658ZM0.477064 4.45064C0.208215 4.48481 0 4.71782 0 4.99989C0 5.30546 0.244364 5.55346 0.545455 5.55346H10.1338L6.66982 9.05423L6.62082 9.11077C6.45747 9.32725 6.4737 9.63843 6.66836 9.83734C6.88073 10.0536 7.22618 10.0543 7.43927 9.83882L11.8393 5.39182L11.8878 5.33613C11.9616 5.23874 12 5.11983 12 4.99989C12 4.92829 11.9862 4.8567 11.9585 4.78879C11.8742 4.58139 11.6756 4.44632 11.4545 4.44632H0.545455L0.477064 4.45064Z'
							/>
						</svg>
					</Link>
				</CardActions>
			</Card>
		)
	);
}

export default ArticleCard;
