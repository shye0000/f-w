import {userIsAuthenticatedRedir, userIsNotAuthenticatedRedir} from 'wbc-components/lib/utils/JWTAuthentication/auth';
import LoginPage from './components/LoginPage';
import AppLayout from './components/Layout';
import NotFoundPage from './modules/notFound/NotFoundPage';
import {routes as NotFoundRoutes} from './modules/notFound/routes';
import {routes as TranslationManagementRoutes} from './modules/translationManagement/routes';
import {routes as HomeRoutes} from './modules/home/routes';
import {routes as AccountsRoutes} from './modules/accounts/routes';
import Logging from './components/Logging';

const moduleRoutes = [
	...TranslationManagementRoutes,
	...HomeRoutes,
	...AccountsRoutes,
	// todo routes to be completed with other modules
];

const Login = userIsNotAuthenticatedRedir(LoginPage);
const Layout = userIsAuthenticatedRedir(Logging)(AppLayout);

const routes = [
	{
		path: '/login',
		exact: true,
		component: Login
	},
	{
		path: '/not_found_public',
		component: NotFoundPage
	}, {
		path: '/',
		component: Layout,
		routes: [
			...moduleRoutes,
			...NotFoundRoutes
		]
	}
];

export default routes;