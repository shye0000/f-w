import React from 'react';
import Dashboard from '../../Dashboard';
import SplitViewNavigation from './SplitViewNavigation';
import './SplitViewDetailsView.scss';

class SplitViewDetailsView extends React.Component {

	render() {
		const {
			head,
			body,
			ids,
			page,
			itemsPerPage,
			elems,
			currentElem,
			listElemOnFocusCallback,
			paginationOnChangeCallback,
		} = this.props;

		return <Dashboard className="split-view-details-view"
			head={{
				...head,
				actionsNotPrimary: true,
				extraActionComp: <SplitViewNavigation
					ids={ids}
					page={page}
					itemsPerPage={itemsPerPage}
					elems={elems}
					currentElem={currentElem}
					listElemOnFocusCallback={listElemOnFocusCallback}
					paginationOnChangeCallback={paginationOnChangeCallback}
				/>
			}}
			body={body}
		/>;
	}
}

export default SplitViewDetailsView;