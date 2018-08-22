import asyncRoute from 'wbc-components/lib/utils/CodeSplitting/asyncRoute/asyncRoute';

const AccountsSplitView = asyncRoute(
	() => import(
		/* webpackChunkName: "accountsSplitView" */
		'./AccountsSplitView'),
	() => import(
		/* webpackChunkName: "accountsReducers" */
		'./redux')
);

const AccountDashboard = asyncRoute(
	() => import(
		/* webpackChunkName: "accountDashboard" */
		'./AccountDashboard'),
	() => import(
		/* webpackChunkName: "accountsReducers" */
		'./redux')
);

const AccountModifyPhoto = asyncRoute(
	() => import(
		/* webpackChunkName: "accountModifyPhoto" */
		'./AccountModifyPhoto'),
	() => import(
		/* webpackChunkName: "accountsReducers" */
		'./redux')
);

export const routes = [{
	path: '/accounts',
	exact: true,
	component: AccountsSplitView
}, {
	path: '/accounts/:accountId',
	exact: true,
	component: AccountDashboard
}, {
	path: '/accounts/:accountId/modify_photo',
	exact: true,
	component: AccountModifyPhoto
}];