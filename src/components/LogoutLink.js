import React from 'react';
import {connect} from 'react-redux';
import {logout} from 'wbc-components/lib/utils/JWTAuthentication/redux/actions';
import {userIsAuthenticated} from 'wbc-components/lib/utils/JWTAuthentication/auth';
import {toggleEditTranslationInline} from 'wbc-components/lib/Translations/redux/actions';
import {Trans} from 'lingui-react';
import Tooltip from 'antd/lib/tooltip';
import IconSvg from 'wbc-components/lib/IconSvg';
import logoutSvg from '../../icons/logout.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './LogoutLink.scss';

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(toggleEditTranslationInline(false));
			dispatch(logout());
		}
	};
};

const LogoutComponent = connect(null, mapDispatchToProps)((props) => {
	const {logout, renderAsIcon} = props;
	const title = <EditableTransWrapper><Trans>Déconnexion</Trans></EditableTransWrapper>;
	if (renderAsIcon) {
		return <Tooltip title={title} placement="bottomRight" arrowPointAtCenter >
			<div className="logout-icon-wrapper" onClick={() => logout()} >
				<IconSvg className="logout-icon" svg={logoutSvg} size={16} />
			</div>
		</Tooltip>;
	}
	return <div onClick={() => logout()} className="logout-link">title</div>;
});

const LogoutLink = userIsAuthenticated(LogoutComponent);

export default LogoutLink;