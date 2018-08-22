import React from 'react';
import {connect} from 'react-redux';
import {Trans} from 'lingui-react';
import Spin from 'antd/lib/spin';
import Pagination from 'antd/lib/pagination';
import DashboardBox from '../../../components/Dashboard/DashboardBox';
import IconSvg from 'wbc-components/lib/IconSvg';
import buildingSvg from '../../../../icons/buildings2.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {
	actions,
	FETCH_USER_FUNCTIONS,
	RESOURCE
} from '../redux';
import './UserFunctionsBox.scss';
import {getUrlParams} from '../../../components/SplitView/utils';


class UserFunctionsBox extends React.Component {

	itemsPerPage = 5

	componentDidMount = () => {
		const {userId, fetchUserFunctions} = this.props;
		fetchUserFunctions(userId, this.itemsPerPage);
	}

	render () {
		const {fetching, fetched, userFunctions, userId, fetchUserFunctions} = this.props;
		return <DashboardBox
			className="user-functions-box"
			config={{
				id: 'functions',
				icon: <IconSvg svg={buildingSvg}/>,
				title: <EditableTransWrapper><Trans>Fonctions</Trans></EditableTransWrapper>,
				content: <Spin spinning={fetching} >
					<div className="user-functions">
						{
							fetched && userFunctions && userFunctions['hydra:member'].length ?
								[
									...userFunctions['hydra:member'].map(func => {
										return <div key={func.id} className="user-function">
											{func['@id']}
										</div>;
									}),
									<Pagination
										key="pagination"
										className="pagination"
										size="small"
										pageSize={this.itemsPerPage}
										current={parseInt(getUrlParams(userFunctions['hydra:view']['@id']).page)}
										total={userFunctions['hydra:totalItems']}
										onChange={(page, pageSize) => fetchUserFunctions(userId, pageSize, page)}
									/>
								] : null
						}
						{
							fetched && (!userFunctions || !userFunctions['hydra:member'].length) ?
								<div className="empty-tag">
									<EditableTransWrapper><Trans>Aucune fonction</Trans></EditableTransWrapper>
								</div> : null
						}
					</div>
				</Spin>,
				requiredRights: [{uri: '/user_group_entities', action: 'GET'}]
			}}
		/>;
	}


};

const mapStateToProps = (state) => {
	return {
		fetching: state[RESOURCE].fetchingUserFunctions,
		fetched: state[RESOURCE].fetchedUserFunctions,
		userFunctions: state[RESOURCE].userFunctions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserFunctions: (userId, itemsPerPage, page) => dispatch(actions[FETCH_USER_FUNCTIONS](userId, itemsPerPage, page)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserFunctionsBox);