import React from 'react';
import {connect} from 'react-redux';
import {SplitViewDetailsView} from '../../components/SplitView';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import IconSvg from 'wbc-components/lib/IconSvg';
import clockSvg from '../../../icons/clock.svg';
import mailSvg from '../../../icons/mail.svg';
import Dashboard from '../../components/Dashboard';
import ProfilePhoto from './components/ProfilePhoto';
import {ACCOUNTS_FETCH_USER, actions, RESOURCE} from './redux';
import {MALE, FEMALE} from '../../constants/Genders';
import userSvg from '../../../icons/user.svg';
import userFemaleSvg from '../../../icons/user-female.svg';
import UserLanguagesBox from './components/UserLanguagesBox';
import UserHistoriesBox from './components/UserHistoriesBox';
import UserProfilesBox from './components/UserProfilesBox';
import UserFunctionsBox from './components/UserFunctionsBox';
import ModifyAccountPhotoModal from './modals/ModifyAccountPhotoModal';
import Tag from 'antd/lib/tag';
import moment from 'moment';
import './AccountDashboard.scss';

class AccountDashboard extends React.Component {

	componentDidMount = () => {
		const accountId = this.getCurrentAccountId();
		if (accountId) {
			this.props.fetchUser(accountId);
		}
	}

	dashboardHead = (user) => {
		if (user && user.id === this.getCurrentAccountId()) {
			const {
				firstName, lastName, gender, enabled, emailVerified,
				createdAt, email, profilePicture
			} = user;
			const {fetchingUserProfiles, userProfiles, fetchingUserFunctions, userFunctions} = this.props;
			return {
				photoComponent: <ProfilePhoto
					photo={profilePicture}
					firstName={firstName}
					lastName={lastName}
				/>,
				title: <div className="account-dashboard-head-title">
					{
						gender === MALE.value ?
							<Tooltip
								arrowPointAtCenter
								title={
									<EditableTransWrapper>
										<Trans>Male</Trans>
									</EditableTransWrapper>
								}
							>
								<div className="gender-icon"><IconSvg size={14} svg={userSvg}/></div>
							</Tooltip> : null
					}
					{
						gender === FEMALE.value ?
							<Tooltip
								arrowPointAtCenter
								title={
									<EditableTransWrapper>
										<Trans>Female</Trans>
									</EditableTransWrapper>
								}
							>
								<div className="gender-icon"><IconSvg size={14} svg={userFemaleSvg}/></div>
							</Tooltip> : null
					}
					<div>{`${firstName} ${lastName}`}</div>
				</div>,
				subTitle: <div className="account-dashboard-subtitle">
					{enabled ?
						<Tag color="#3FB05D">
							<EditableTransWrapper>
								<Trans>Actif</Trans>
							</EditableTransWrapper>
						</Tag>
						:
						<Tag color="#909091">
							<EditableTransWrapper>
								<Trans>Inactif</Trans>
							</EditableTransWrapper>
						</Tag>
					}
					{emailVerified ?
						<Tag color="#3FB05D">
							<EditableTransWrapper>
								<Trans>Email vérifié</Trans>
							</EditableTransWrapper>
						</Tag>
						:
						<Tag color="#909091">
							<EditableTransWrapper>
								<Trans>Email non vérifié</Trans>
							</EditableTransWrapper>
						</Tag>
					}
				</div>,
				contents: [
					{
						component : <Row gutter={20} className="account-dashboard-contents">
							<Col sm={24} md={14} className="contents-main">
								<div className="content-item">
									<IconSvg svg={clockSvg} size={14} />
									<EditableTransWrapper><Trans>Créé le</Trans></EditableTransWrapper>
									<span>{moment(createdAt).format('LL')}</span>
								</div>
								<div className="content-item">
									<IconSvg svg={mailSvg} size={14} />
									<span>{email}</span>
								</div>
							</Col>
							<Col sm={24} md={5} className="functions">
								<div className="number">
									{fetchingUserFunctions ? <Icon type="loading" /> : null}
									{!fetchingUserFunctions && userFunctions ? userFunctions['hydra:totalItems'] : null}
								</div>
								<div>
									<EditableTransWrapper><Trans>Fonctions</Trans></EditableTransWrapper>
								</div>
							</Col>
							<Col sm={24} md={5} className="profiles">
								<div className="number">
									{fetchingUserProfiles ? <Icon type="loading" /> : null}
									{!fetchingUserProfiles && userProfiles ? userProfiles.length : null}
								</div>
								<div>
									<EditableTransWrapper><Trans>Profils</Trans></EditableTransWrapper>
								</div>
							</Col>
						</Row>
					}
				],
				actions: [{
					id: 'modify',
					title: <EditableTransWrapper><Trans>Modifier les informations du compte</Trans></EditableTransWrapper>,
				}, {
					id: 'modifyPhoto',
					title: <EditableTransWrapper><Trans>Modifier la photo du compte</Trans></EditableTransWrapper>,
					modal: <ModifyAccountPhotoModal width={650} user={user}/>,
					link: `/accounts/${user.id}/modify_photo`,
					requiredRights: [{uri: user['@id'], action: 'PUT'}]
				}]
			};
		}
	}

	dashboardBody = (user) => {
		if (user && user.id === this.getCurrentAccountId()) {
			return {
				fixedLayout: true,
				fixedLayoutBody: <div>
					<Row gutter={20}>
						<Col sm={24} md={24}>
							<UserProfilesBox userId={user.id} />
						</Col>
						<Col sm={24} md={24}>
							<UserFunctionsBox userId={user.id} />
						</Col>
						<Col sm={24} md={12}>
							<UserLanguagesBox userId={user.id} />
						</Col>
						<Col sm={24} md={12}>
							<UserHistoriesBox userId={user.id} />
						</Col>
					</Row>
				</div>,
				anchors: [
					{
						id: 'profiles',
						title: <EditableTransWrapper><Trans>Profils</Trans></EditableTransWrapper>
					}, {
						id: 'functions',
						title: <EditableTransWrapper><Trans>Fonctions</Trans></EditableTransWrapper>
					}, {
						id: 'languages',
						title: <EditableTransWrapper><Trans>Langues</Trans></EditableTransWrapper>
					}, {
						id: 'history',
						title: <EditableTransWrapper><Trans>Historique</Trans></EditableTransWrapper>
					}
				],
			};
		}
	}

	getCurrentAccountId = () => {
		const {match, elem} = this.props;
		if (match && match.params.accountId) {
			return parseInt(match.params.accountId);
		}
		if (elem && elem.id) {
			return parseInt(elem.id);
		}
		return null;
	}

	render() {
		const {fetchedUser, user, splitView} = this.props;
		const head = this.dashboardHead(user);
		const body = this.dashboardBody(user);
		return <div className="account-dashboard">
			{!user && fetchedUser ? <div className="empty-tag">User non existé</div> : null}
			{user && splitView ? <SplitViewDetailsView
				className="contact-dashboard"
				head={head}
				body={body}
				{...this.props}
			/> : null}
			{user && !splitView ? <Dashboard
				className="contact-dashboard"
				head={head}
				body={body}
				{...this.props}
			/> : null}
		</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state[RESOURCE].user,
		userProfiles: state[RESOURCE].userProfiles,
		fetchingUser: state[RESOURCE].fetchingUser,
		fetchedUser: state[RESOURCE].fetchedUser,
		fetchingUserProfiles: state[RESOURCE].fetchingUserProfiles,
		fetchingUserFunctions: state[RESOURCE].fetchingUserFunctions,
		userFunctions: state[RESOURCE].userFunctions,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser: (id) => dispatch(actions[ACCOUNTS_FETCH_USER](id)),
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(AccountDashboard);
