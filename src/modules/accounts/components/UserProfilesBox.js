import React from 'react';
import {connect} from 'react-redux';
import {Trans} from 'lingui-react';
import Spin from 'antd/lib/spin';
import DashboardBox from '../../../components/Dashboard/DashboardBox';
import IconSvg from 'wbc-components/lib/IconSvg';
import keySvg from '../../../../icons/key.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {
	actions,
	FETCH_USER_PROFILES,
	RESOURCE
} from '../redux';
import './UserProfilesBox.scss';


class UserProfilesBox extends React.Component {

	componentDidMount = () => {
		const {userId, fetchUserProfiles} = this.props;
		fetchUserProfiles(userId);
	}

	render () {
		const {fetching, fetched, userProfiles} = this.props;
		return <DashboardBox
			className="user-profiles-box"
			config={{
				id: 'profiles',
				icon: <IconSvg svg={keySvg}/>,
				title: <EditableTransWrapper><Trans>Profils</Trans></EditableTransWrapper>,
				content: <Spin spinning={fetching} >
					{
						fetched && userProfiles && userProfiles.length ?
							userProfiles
								.map(profile => <div
									className="profile-item"
									key={profile.id}
								>
									{profile['@id']}
								</div>) : null
					}
					{
						fetched && (!userProfiles || !userProfiles.length) ?
							<div className="empty-tag">
								<EditableTransWrapper><Trans>Aucun profil</Trans></EditableTransWrapper>
							</div> : null
					}
				</Spin>,
				requiredRights: [{uri: '/groups', action: 'GET'}]
			}}
		/>;
	}


};

const mapStateToProps = (state) => {
	return {
		fetching: state[RESOURCE].fetchingUserProfiles,
		fetched: state[RESOURCE].fetchedUserProfiles,
		userProfiles: state[RESOURCE].userProfiles,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserProfiles: (userId) => dispatch(actions[FETCH_USER_PROFILES](userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilesBox);