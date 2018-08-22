import React from 'react';
import {connect} from 'react-redux';
import {Trans} from 'lingui-react';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';
import DashboardBox from '../../../components/Dashboard/DashboardBox';
import IconSvg from 'wbc-components/lib/IconSvg';
import flagSvg from '../../../../icons/flag.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {
	actions,
	FETCH_USER_LANGUAGES,
	RESOURCE
} from '../redux';
import './UserLanguagesBox.scss';


class UserLanguagesBox extends React.Component {

	componentDidMount = () => {
		const {userId, fetchUserLanguages} = this.props;
		fetchUserLanguages(userId);
	}

	render () {
		const {fetching, fetched, userLanguages} = this.props;
		return <DashboardBox
			className="user-languages-box"
			config={{
				id: 'languages',
				icon: <IconSvg svg={flagSvg}/>,
				title: <EditableTransWrapper><Trans>Langues de communication</Trans></EditableTransWrapper>,
				content: <Spin spinning={fetching} >
					{
						fetched && userLanguages && userLanguages.length ?
							userLanguages
								.sort((langA, langB) => langA.position - langB.position)
								.map(lang => <div
									className="language-item"
									key={lang.id}
								>
									<span className="number">{`${lang.position + 1}.`}</span>
									<span className="name">{lang.language.lang}</span>
								</div>) : null
					}
					{
						fetched && (!userLanguages || !userLanguages.length) ?
							<div className="empty-tag">
								<EditableTransWrapper><Trans>Aucune langue</Trans></EditableTransWrapper>
							</div> : null
					}
				</Spin>,
				actions: [{
					id: 'editUserLanguages',
					icon: <Icon type="edit" />,
					unfolded: true,
					title: <EditableTransWrapper><Trans>Modifier langues</Trans></EditableTransWrapper>,
				}],
				requiredRights: [{uri: '/user_languages', action: 'GET'}]
			}}
		/>;
	}


};

const mapStateToProps = (state) => {
	return {
		fetching: state[RESOURCE].fetchingUserLanguages,
		fetched: state[RESOURCE].fetchedUserLanguages,
		userLanguages: state[RESOURCE].userLanguages,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserLanguages: (userId) => dispatch(actions[FETCH_USER_LANGUAGES](userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLanguagesBox);