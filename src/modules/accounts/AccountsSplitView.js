import React from 'react';
import {connect} from 'react-redux';
import {Trans} from 'lingui-react';
import Select from 'antd/lib/select';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import SplitView from '../../components/SplitView';
import DatePicker from '../../components/DatePicker';
import AccountListElemComp from './components/AccountListElemComp';
import {
	actions,
	RESOURCE,
	CLEAR_IDS,
	ACCOUNTS_FETCH_TABLE_IDS,
	ACCOUNTS_FETCH_BY_IDS
} from './redux';
import './AccountsSplitView.scss';
import AccountDashboard from './AccountDashboard';

const AccountsSplitView = (props) => {
	const {
		ids, fetchingUser, fetchedIds, fetchingIds, fetchIds, fetchingByIds,
		clearIds, fetchByIds, splitViewListElements
	} = props;
	return <SplitView
		className="accounts"
		id="ACCOUNTS_SPLIT_VIEW"
		fetchingElem={fetchingUser}
		fetchingIds={fetchingIds}
		fetchedIds={fetchedIds}
		fetchingByIds={fetchingByIds}
		ids={ids ? ids['hydra:member'] : undefined}
		listActions={[
			{
				id: 'addUser',
				title: <EditableTransWrapper>
					<Trans>Ajouter un compte</Trans>
				</EditableTransWrapper>,
			}, {
				id: 'modifyState',
				actionForCheckedElems: true,
				title: <EditableTransWrapper>
					<Trans>{'Modifier l\'état des comptes sélectionées'}</Trans>
				</EditableTransWrapper>,
			}, {
				id: 'exportUsersList',
				title: <EditableTransWrapper>
					<Trans>Exporter la liste de comptes</Trans>
				</EditableTransWrapper>,
			}
		]}
		listElements={
			splitViewListElements ? splitViewListElements.map(elem => ({
				...elem,
				key: elem.id
			})) : null
		}
		listElemComp={elem => <AccountListElemComp account={elem} />}
		generalSearch
		filters={filters}
		sorts={sorts}
		defaultSort={{id: 'firstName', way: 'ASC'}}
		fetchIds={params => fetchIds(params)}
		fetchByIds={params => fetchByIds(params)}
		clearIds={() => clearIds()}
		dashboardComp={props => <AccountDashboard {...props} splitView />}
	/>;
};

const filters = [{
	id: 'enabled',
	title: <EditableTransWrapper><Trans>État</Trans></EditableTransWrapper>,
	component: <Select style={{width: '100px'}}>
		<Select.Option key="true" value="true">
			<EditableTransWrapper><Trans>Activé</Trans></EditableTransWrapper>
		</Select.Option>
		<Select.Option key="false" value="false">
			<EditableTransWrapper><Trans>Inactivé</Trans></EditableTransWrapper>
		</Select.Option>
	</Select>
}, {
	id: 'test.date',
	title: <EditableTransWrapper><Trans>Date</Trans></EditableTransWrapper>,
	component: <DatePicker size="small" time style={{width: '130px'}} />
}];

const sorts = [{
	id: 'enabled',
	title: <EditableTransWrapper><Trans>État</Trans></EditableTransWrapper>,
}, {
	id: 'firstName',
	title: <EditableTransWrapper><Trans>Prénom</Trans></EditableTransWrapper>,
}, {
	id: 'lastName',
	title: <EditableTransWrapper><Trans>Nom</Trans></EditableTransWrapper>,
}];

const mapStateToProps = (state) => {
	return {
		fetchingUser: state[RESOURCE].fetchingUser,
		fetchingIds: state[RESOURCE].fetchingIds,
		fetchedIds: state[RESOURCE].fetchedIds,
		fetchingByIds: state[RESOURCE].fetchingByIds,
		ids: state[RESOURCE].ids,
		splitViewListElements: state[RESOURCE].splitViewListElements,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchIds: (filterValues) => dispatch(actions[ACCOUNTS_FETCH_TABLE_IDS](filterValues)),
		fetchByIds: (params) => dispatch(actions[ACCOUNTS_FETCH_BY_IDS](params)),
		clearIds: () => dispatch(actions[CLEAR_IDS]()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsSplitView);