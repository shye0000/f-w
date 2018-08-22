import React from 'react';
import {renderRoutes} from 'react-router-config';
import AntdLayout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import './Layout.scss';
import Navigation from './Navigation.js';
import AppUser from './AppUser';
import AppName from './AppName';
import AppMenu from '../../jts-apps/AppMenu';
import {LanguageSelect} from 'wbc-components/lib/Translations';
import {checkUserAdmin} from '../modules/utils/userRightsManagement';
import LogoutLink from './LogoutLink';
import Breadcrumb from './Breadcrumb';
import EditTranslationToggle from './EditTranslationToggle';

class Layout extends React.Component {

	state = { mainMenuCollapsed: true }

	toggleMainMenu = () => {
		this.setState({
			mainMenuCollapsed: !this.state.mainMenuCollapsed,
		});
	}

	UNSAFE_componentWillReceiveProps() {
		if (typeof window !== 'undefined') {
			window.hasPreviousLocation = !!window.previousLocation;
			window.previousLocation = this.props.location;
		}
	}

	render() {
		const { Header, Sider, Content } = AntdLayout;
		const {mainMenuCollapsed} = this.state;

		return <div className="layout">
			<Header className="app-header">
				<div className="header-left">
					<AppMenu />
					<AppName />
				</div>
				<div className="header-right">
					{checkUserAdmin() ? <EditTranslationToggle />: null}
					<div className="language-select-wrapper">
						<LanguageSelect />
					</div>
					<AppUser/>
					<div className="logout-link-wrapper">
						<LogoutLink renderAsIcon />
					</div>
				</div>
			</Header>
			<AntdLayout className="app-body">
				<Sider
					expanding="true"
					className="app-side-menu"
					width={280}
					collapsedWidth={50}
					collapsed={mainMenuCollapsed}>
					<div className="menu-toggle-trigger" onClick={this.toggleMainMenu}>
						<Icon className="mark" type="left" />
					</div>
					<Navigation />
				</Sider>
				<Content className="app-page-wrapper">
					<Breadcrumb />
					<div className="app-page">
						{renderRoutes(this.props.route.routes)}
					</div>
				</Content>
			</AntdLayout>
		</div>;
	}
}

export default Layout;
