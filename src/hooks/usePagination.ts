import { useEffect, useMemo } from 'react';
import { chunk } from 'lodash';
import useArticlesStore from '../store';
import { IArticle } from '../types/article.interface';
import { useNavigate, useSearchParams } from 'react-router-dom';

const itemsPerPage = 5;

export function usePagination(): {
	currPage: number;
	itemsPerPage: number;
	visibleArticles: IArticle[];
	filteredArticles: IArticle[] | null;
} {
	const articles = useArticlesStore((state) => state.articles);
	const filter = useArticlesStore((state) => state.filter);
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();
	let pageFromParams = parseInt(searchParams.get('page') ?? '1', 10);
	const filterFromParams = searchParams.get('filter') ?? '';

	const filteredArticles = useMemo(() => {
		if (!filter) return articles;

		const filteredByTitle: IArticle[] = [];
		const filteredBySummary: IArticle[] = [];

		articles?.forEach((article) => {
			const searchingWords = filter?.split(' ') ?? [];

			for (const word of searchingWords) {
				if (article.title.toLowerCase().includes(word)) {
					filteredByTitle.push(article);
					return;
				}

				if (article.summary.toLowerCase().includes(word)) {
					filteredBySummary.push(article);
					return;
				}
			}
		});

		return [...filteredByTitle, ...filteredBySummary];
	}, [articles, filter]);

	const currPage = useMemo(() => {
		const pagesCount = Math.ceil(
			(filteredArticles?.length || 0) / itemsPerPage
		);

		if (pageFromParams > pagesCount) {
			pageFromParams = pagesCount;
		}

		if (pageFromParams <= 0) {
			pageFromParams = 1;
		}

		return pageFromParams;
	}, [itemsPerPage, filteredArticles, searchParams]);

	useEffect(() => {
		navigate(`articles?page=${currPage}&filter=${filterFromParams}`);
	}, [searchParams, currPage]);

	const paginatedArticles = useMemo(
		() => chunk(filteredArticles, itemsPerPage),
		[filteredArticles]
	);

	const visibleArticles = useMemo(
		() => paginatedArticles[currPage - 1],
		[paginatedArticles, currPage]
	);

	return { currPage, itemsPerPage, visibleArticles, filteredArticles };
}
