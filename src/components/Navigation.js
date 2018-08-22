import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {checkUserAdmin} from '../modules/utils/userRightsManagement';
import IconSvg from 'wbc-components/lib/IconSvg';
import homeSvg from '../../icons/home.svg';
import comptesSvg from '../../icons/comptes.svg';
import { matchPath } from 'react-router';
import routes from '../routes';
import './Navigation.scss';

class Navigation extends React.Component {

	getCurrentSelectedKeys(matchedRoutes, routes) {
		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
			let matchConfig = {
				path: route.path
			};
			if (route.path === '/') {
				matchConfig.exact = true;
			}
			if (matchPath(this.props.location.pathname, matchConfig) && route.path !== '/*') {
				matchedRoutes.push(route.path);
			}
			if (route.routes) {
				this.getCurrentSelectedKeys(matchedRoutes, route.routes);
			}
		}
	}

	render () {
		let selectedKeys = [];
		this.getCurrentSelectedKeys(selectedKeys, routes);
		return (
			<Menu
				selectedKeys={selectedKeys}
				id="navigation"
				mode="inline"
				theme="dark"
				defaultOpenKeys={['subNav']}>
				<Menu.Item key="/">
					<NavLink to="/">
						<IconSvg className="nav-icon" svg={homeSvg} />
						<span><EditableTransWrapper><Trans>Accueil</Trans></EditableTransWrapper></span>
					</NavLink>
				</Menu.Item>
				<Menu.SubMenu key="accounts" title={
					<span>
						<IconSvg className="nav-icon" svg={comptesSvg} />
						<span><EditableTransWrapper><Trans>Comptes</Trans></EditableTransWrapper></span>
					</span>
				}>
					<Menu.Item key="/accounts">
						<NavLink to="/accounts">
							<span><EditableTransWrapper><Trans>Liste complète</Trans></EditableTransWrapper></span>
						</NavLink>
					</Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu key="setting" title={
					<span>
						<Icon className="nav-icon" type="setting" />
						<span><EditableTransWrapper><Trans>Paramètres</Trans></EditableTransWrapper></span>
					</span>
				}>
					<Menu.Item
						key="/translation_management"
						disabled={!checkUserAdmin()}
					>
						<NavLink to="/translation_management">
							<span><EditableTransWrapper><Trans>Traductions</Trans></EditableTransWrapper></span>
						</NavLink>
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		);
	}
}

export default withRouter(Navigation);
