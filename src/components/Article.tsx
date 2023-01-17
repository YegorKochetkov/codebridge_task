import React, { Fragment } from 'react';
import { Box, SxProps } from '@mui/system';
import { Typography, Link, ThemeProvider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useArticlesStore from '../store';
import ErrorMessage from './ErrorMessage';
import { useTheme } from '../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

function Article() {
	const { articleId } = useParams();
	const { theme } = useTheme();
	const navigate = useNavigate();

	const articleImgStyles: SxProps = {
		height: '15.31rem',
		width: '100%',
		maxWidth: 'var(--appMaxWidth)',

		objectFit: 'cover',
		objectPosition: 'bottom',
	};

	const articleContainerStyles: SxProps = {
		position: 'relative',

		fontFamily: theme.typography.fontFamily,
		color: theme.palette.textColors.dark,
		backgroundColor: theme.palette.textColors.main,

		maxWidth: 'var(--articleMaxWidth)',
		minWidth: 'var(--articleMinWidth)',

		margin: '0 auto',
		marginTop: '-5.625rem',
		marginBottom: '6.5rem',
		padding: 'var(--articlePaddings)',

		border: 'var(--boxBorder)',
		boxShadow: theme.shadows[theme.shadows.length - 1],
	};

	const articleTitleStyles: SxProps = {
		fontSize: '1.5rem',
		fontWeight: '400',
		lineHeight: '1.81rem',
		textAlign: 'center',

		marginBottom: '3.125rem',
	};

	const articleTextStyles: SxProps = {
		fontSize: '1.125rem',
		'& p': {
			margin: 0,
			marginBottom: '2.8rem',
			padding: 0,
		},
		'& p:last-of-type': {
			marginBottom: '0',
		},
	};

	const articleLinkStyles: SxProps = {
		position: 'absolute',

		marginBottom: '2.81rem',
		marginTop: '5.3rem',

		display: 'flex',
		alignItems: 'baseline',
		gap: '0.37rem',

		'& svg': {
			transform: 'rotate(180deg)',
		},

		'& svg path': {
			fill: '#000',
		},

		'@media (prefers-color-scheme: dark)': {
			'& svg path': {
				fill: '#fff',
			},
		},

		fontSize: '1rem',
		fontWeight: '700',
		lineHeight: '1.5rem',
		fontFamily: 'var(--font)',
	};

	if (articleId === undefined) {
		return <ErrorMessage error='Article not found!' />;
	}

	const article = articleId
		? useArticlesStore((state) =>
				state.getArticle(parseInt(articleId ?? '-1', 10))
		  )
		: null;

	return (
		<ThemeProvider theme={theme}>
			<AnimatePresence>
				<motion.span
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Fragment>
						<Box
							component='img'
							src={article?.imageUrl}
							alt={article?.title}
							sx={articleImgStyles}
						/>
						<Box sx={articleContainerStyles} component='article'>
							<Typography sx={articleTitleStyles} component='h1'>
								{article?.title}
							</Typography>
							<Typography sx={articleTextStyles} component='span'>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
									provident doloribus ipsum aliquid? Commodi possimus aliquid
									voluptatibus reprehenderit mollitia. Nisi, omnis laborum
									adipisci cumque nihil sed ipsa ut commodi quod explicabo quas
									magni reiciendis deleniti aliquam tempore eligendi quasi
									dolore veritatis harum! Minima molestiae aspernatur, explicabo
									nam asperiores ipsa quos impedit corrupti corporis quidem!
									Nesciunt velit cupiditate asperiores tenetur, harum doloribus,
									vero, deserunt voluptatem minima non nemo laudantium possimus
									magnam aut voluptatibus culpa nam molestias? Repellendus
									reiciendis, mollitia aliquam rem aperiam iusto sequi
									voluptatem culpa unde eum beatae maiores. Enim ex voluptatum
									sed quaerat assumenda harum, sapiente delectus quasi.
									Reiciendis?
								</p>
								<p>
									Odio vel obcaecati eveniet ducimus doloribus dolorem?
									Laudantium assumenda alias rerum in perferendis veniam
									explicabo corporis ad, voluptatem inventore sit! Explicabo aut
									neque et rerum. Veritatis, quam? Rem, nostrum amet. Aspernatur
									architecto ipsa doloribus accusamus a reiciendis sint quaerat
									ullam hic. Aut pariatur facilis maiores labore eveniet quos
									omnis corrupti sapiente. A nesciunt, corporis dignissimos
									animi reprehenderit aspernatur dicta nam, pariatur doloremque
									sapiente perferendis voluptate fugiat eveniet? Autem a quas
									tempore libero recusandae ad ducimus delectus commodi dicta,
									aperiam ipsum facere in, culpa repudiandae ea enim sint fugit
									labore cum quisquam? Maiores facere repellendus veritatis non,
									totam voluptatibus nulla ab!
								</p>
								<p>
									Dignissimos eligendi perferendis dolores eum veritatis, ad,
									odio sequi corrupti, quibusdam facere explicabo dolore cumque
									ipsam saepe libero at maxime esse neque nostrum magni rem
									illum id. Nobis vitae esse dolor sint. Laborum necessitatibus
									officiis recusandae mollitia fugit eaque, alias consectetur
									odio nihil ducimus accusamus enim modi tempora iure? Veniam
									totam dolorum nihil modi quos vitae ab vero est autem
									dignissimos maiores, praesentium iusto? Sed inventore numquam
									quaerat ratione, similique eum aut magnam eveniet dolore et
									aperiam? Iusto molestias repellendus dignissimos quis
									pariatur. Modi commodi possimus esse numquam dolor tempora!
									Eligendi architecto rerum quisquam, cum vel iusto unde
									obcaecati doloremque.
								</p>
								<p>
									Eos beatae id illum, magnam atque itaque labore deleniti odit
									doloribus quasi totam illo eius dolore soluta aliquid iusto
									excepturi! Reiciendis maxime sit accusamus? Quod labore amet
									totam sint nesciunt laudantium fuga sit delectus distinctio
									assumenda, impedit nam vitae dolore suscipit maxime? Vitae,
									laudantium sapiente dolorum harum eligendi labore quos quasi
									accusantium ipsa dolores voluptates modi beatae magnam ipsam
									minus facilis quas, doloribus nobis quo est ducimus. Minima
									possimus earum accusamus corporis dicta corrupti quod incidunt
									ratione voluptate unde repellendus quibusdam eum, commodi
									molestiae ipsa est odit necessitatibus tempore obcaecati aut
									distinctio. Atque quod harum ea aut totam. Impedit, repellat.
								</p>
							</Typography>
							<Link
								component='button'
								underline='hover'
								color='inherit'
								sx={articleLinkStyles}
								onClick={() => {
									navigate(-1);
								}}
							>
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
								<span>Back to homepage</span>
							</Link>
						</Box>
					</Fragment>
				</motion.span>
			</AnimatePresence>
		</ThemeProvider>
	);
}

export default Article;
