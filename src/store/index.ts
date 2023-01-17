import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IArticle } from '../types/article.interface';

const API_URL = 'https://api.spaceflightnewsapi.net/v3/articles';

interface ArticlesStateType {
	articles: IArticle[] | null;
	filter: string | null;
	fetchError: string | null;
	loadArticles: () => void;
	getArticle: (id: number) => IArticle | null;
	setFilter: (query: string) => void;
}

const useArticlesStore = create<ArticlesStateType>()(
	devtools(
		persist(
			(set, get) => ({
				articles: null,
				fetchError: null,
				filter: null,

				loadArticles: async () => {
					set({ fetchError: null }, false, 'loadArticles');

					try {
						const response = await fetch(API_URL);
						const articles = await response.json();

						if (articles.error) throw articles.error;

						set({ articles, fetchError: null }, false, 'loadArticles');
					} catch (error) {
						if (error instanceof Error) {
							set({ fetchError: error.message });
						} else {
							set({ fetchError: String(error) });
						}
					}
				},

				setFilter: (query: string) => {
					set({ filter: query });
				},

				getArticle: (id: number) => {
					const articles = get().articles;
					const article =
						articles?.find((article) => article.id === id) || null;

					return article;
				},
			}),
			{
				name: 'codebridge-task',
			}
		)
	)
);

export default useArticlesStore;
