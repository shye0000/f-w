import React from 'react';
import Button from 'antd/lib/button';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './SplitViewNavigation.scss';

class SplitViewNavigation extends React.Component {

	propsValid = () => {
		const {ids, page, elems, currentElem, itemsPerPage} = this.props;
		if (
			ids && ids.length &&
			page && page > 0 &&
			itemsPerPage &&
			elems && elems.length &&
			currentElem &&
			elems.findIndex(elem => elem.key === currentElem) > -1
		) {
			return true;
		}
		return false;
	}

	currentElemPosition = () => {
		if (this.propsValid()) {
			const {page, elems, currentElem, itemsPerPage} = this.props;
			return (page - 1) * itemsPerPage + elems.findIndex(elem => elem.key === currentElem) + 1;
		}
	}

	total = () => {
		const {ids} = this.props;
		if (ids && ids.length) {
			return ids.length;
		}
		return null;
	}

	previous = () => {
		const {
			page, elems, currentElem, itemsPerPage,
			listElemOnFocusCallback, paginationOnChangeCallback
		} = this.props;
		if (!this.propsValid()) {
			return;
		}
		const idx = elems.findIndex(elem => elem.key === currentElem);
		const isCurrentPageFirst = idx === 0;
		if (isCurrentPageFirst && page > 1) {
			return paginationOnChangeCallback(page - 1, itemsPerPage, true);
		}
		listElemOnFocusCallback(elems[idx - 1].key);
	}

	next = () => {
		const {
			page, elems, currentElem, itemsPerPage,
			listElemOnFocusCallback, paginationOnChangeCallback,
		} = this.props;
		if (!this.propsValid()) {
			return;
		}
		const idx = elems.findIndex(elem => elem.key === currentElem);
		const isCurrentPageLast = idx === elems.length - 1;
		const totalPages = Math.ceil(this.total() / itemsPerPage);
		if (isCurrentPageLast && page < totalPages) {
			return paginationOnChangeCallback(page + 1, itemsPerPage);
		}
		listElemOnFocusCallback(elems[idx + 1].key);
	}

	render() {
		const currentElemPosition = this.currentElemPosition();
		const total = this.total();
		return <div className="split-view-navigation">
			<div className="navigation-position-total">
				<span>{currentElemPosition}</span>
				<EditableTransWrapper><Trans>sur</Trans></EditableTransWrapper>
				<span>{total}</span>
			</div>
			<div className="navigation-actions">
				<Button
					icon="up"
					disabled={currentElemPosition === 1}
					onClick={() => this.previous()}
				/>
				<Button
					icon="down"
					disabled={currentElemPosition === total}
					onClick={() => this.next()}
				/>
			</div>
		</div>;
	}
}

export default SplitViewNavigation;