import asyncRoute from 'wbc-components/lib/utils/CodeSplitting/asyncRoute/asyncRoute';

const HomePage = asyncRoute(
	() => import(
		/* webpackChunkName: "home" */
		'./Home')
);

export const routes = [{
	path: '/',
	exact: true,
	component: HomePage
}];