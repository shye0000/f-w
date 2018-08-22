import React from 'react';
import {connect} from 'react-redux';
import {Trans} from 'lingui-react';
import Spin from 'antd/lib/spin';
import Pagination from 'antd/lib/pagination';
import DashboardBox from '../../../components/Dashboard/DashboardBox';
import IconSvg from 'wbc-components/lib/IconSvg';
import historySvg from '../../../../icons/historique.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {getUrlParams} from '../../../components/SplitView/utils';
import {
	actions,
	FETCH_USER_HISTORIES,
	RESOURCE
} from '../redux';
import moment from 'moment';
import './UserHistoriesBox.scss';


class UserHistoriesBox extends React.Component {

	itemsPerPage = 5

	componentDidMount = () => {
		const {userId, fetchUserHistories} = this.props;
		fetchUserHistories(userId, this.itemsPerPage);
	}

	render () {
		const {fetching, fetched, userHistories, userId, fetchUserHistories} = this.props;
		return <DashboardBox
			className="user-histories-box"
			config={{
				id: 'history',
				icon: <IconSvg svg={historySvg}/>,
				title: <EditableTransWrapper><Trans>Historique</Trans></EditableTransWrapper>,
				content: <Spin spinning={fetching} >
					<div className="user-histories">
						{
							fetched && userHistories && userHistories['hydra:member'].length ?
								[
									...userHistories['hydra:member'].map(history => {
										const {
											id,
											createdByProject,
											createdByFirstName,
											createdByLastName,
											createdByContext,
											createdAt,
										} = history;
										return <div key={id} className="user-history">
											<div className="main">
												<div>{createdByContext}</div>
												<div>{createdByFirstName}</div>
												<div>{createdByLastName}</div>
												<div>{moment(createdAt).format('L')}</div>
												<div>{createdByProject.name}</div>
											</div>
										</div>;
									}),
									<Pagination
										key="pagination"
										className="pagination"
										size="small"
										pageSize={this.itemsPerPage}
										current={parseInt(getUrlParams(userHistories['hydra:view']['@id']).page)}
										total={userHistories['hydra:totalItems']}
										onChange={(page, pageSize) => fetchUserHistories(userId, pageSize, page)}
									/>
								] : null
						}
						{
							fetched && (!userHistories || !userHistories['hydra:member'].length) ?
								<div className="empty-tag">
									<EditableTransWrapper><Trans>Aucun historique</Trans></EditableTransWrapper>
								</div> : null
						}
					</div>
				</Spin>,
				requiredRights: [{uri: '/user_histories', action: 'GET'}]
			}}
		/>;
	}
}

const mapStateToProps = (state) => {
	return {
		fetching: state[RESOURCE].fetchingUserHistories,
		fetched: state[RESOURCE].fetchedUserHistories,
		userHistories: state[RESOURCE].userHistories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserHistories: (userId, itemsPerPage, page) => dispatch(actions[FETCH_USER_HISTORIES](userId, itemsPerPage, page)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHistoriesBox);