import React from 'react';
import { createHashRouter, redirect } from 'react-router-dom';
import App from '../App';
import Article from '../components/Article';
import ErrorPage from '../components/ErrorPage';
import ArticlesList from '../components/ArticlesList';

const router = createHashRouter([
	{
		path: '',
		element: <App />,

		errorElement: <ErrorPage />,
		loader: () => redirect('/articles'),
	},
	{
		path: '/articles',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '*',
				element: <ArticlesList />,
			},
		],
	},
	{
		path: '/article/',
		errorElement: <ErrorPage />,
		children: [
			{
				path: ':articleId',
				element: <Article />,
			},
		],
	},
]);

export default router;
