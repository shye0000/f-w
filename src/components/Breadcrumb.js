import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Trans} from 'lingui-react';
import _Breadcrumb from 'antd/lib/breadcrumb';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './Breadcrumb.scss';

const breadcrumbNameMap = [
	{
		route: '/translation_management',
		label: <EditableTransWrapper><Trans>Traductions</Trans></EditableTransWrapper>,
		noLink: false
	},
	{
		route: '/accounts',
		label: <EditableTransWrapper><Trans>Comptes</Trans></EditableTransWrapper>,
		noLink: false
	},
	{
		route: '/accounts/\\d+',
		label: <EditableTransWrapper><Trans>Fiche compte</Trans></EditableTransWrapper>,
		noLink: false
	},
	{
		route: '/accounts/\\d+/modify_photo',
		label: <EditableTransWrapper><Trans>Modifier la photo du compte</Trans></EditableTransWrapper>,
		noLink: false
	}
	// todo breadcrumb names to be completed with other modules routes
];

const Breadcrumb = withRouter((props) => {

	const { location } = props;

	const pathSnippets = location.pathname.split('/').filter(i => i);

	let extraBreadcrumbItems = [];

	for (let i = pathSnippets.length - 1; i >= 0; i--) {
		const url = `/${pathSnippets.slice(0, i + 1).join('/')}`;
		const matched = breadcrumbNameMap.find(nameMap => url.match(`^${nameMap.route}$`));
		if (!matched) {
			extraBreadcrumbItems.push(
				<_Breadcrumb.Item key={url}>
					<EditableTransWrapper><Trans>Page non trouvée</Trans></EditableTransWrapper>
				</_Breadcrumb.Item>
			);
			break;
		} else {
			const {label, noLink} = matched;
			extraBreadcrumbItems.push(
				<_Breadcrumb.Item key={url}>
					{noLink ? label : <Link to={url}>
						{label}
					</Link>}
				</_Breadcrumb.Item>
			);
		}
	}

	const breadcrumbItems = [(
		<_Breadcrumb.Item key="home">
			<Link to="/">
				<EditableTransWrapper><Trans>Accueil</Trans></EditableTransWrapper>
			</Link>
		</_Breadcrumb.Item>
	)].concat(extraBreadcrumbItems.reverse());

	return (
		<_Breadcrumb separator="|" className="breadcrumb">
			{breadcrumbItems}
		</_Breadcrumb>
	);

});

export default Breadcrumb;
