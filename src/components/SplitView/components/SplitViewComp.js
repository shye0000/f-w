import React from 'react';
import classNames from 'classnames';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import Spin from 'antd/lib/spin';
import SplitViewFilters from './SplitViewFilters';
import SplitViewSorting from './SplitViewSorting';
import SplitViewPagination from './SplitViewPagination';
import PleaseSearch from './PleaseSearch';
import SplitViewEmpty from './SplitViewEmpty';
import SplitViewListBody from './SplitViewListBody';
import ClickListElemTip from './ClickListElemTip';
import Actions from '../../Actions';
import {withRouter} from 'react-router-dom';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {
	saveUserNavigationInLocalStorage,
	getUserNavigationInLocalStorage,
	saveUserNavigationInUrl,
	getUserNavigationInUrl,
	IsJsonString,
} from '../utils';
import {ASC, DESC} from '../utils/constants';
import './SplitViewComp.scss';
import dot from 'dot-object';

class SplitView extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.initialState();
		this.props.clearIds();
		this.saveUserNavigation();
	}

	pageSizeOptions = ['2', '5', '10', '20', '50', '100']; // todo only 20 50 100

	defaultPage = 1

	defaultItemsPerPage = 2; // todo 20

	generalSearchFilter= {
		id: 'search',
		title: <EditableTransWrapper><Trans>Rechercher par mot clé</Trans></EditableTransWrapper>,
		component: <Input style={{width: '100px'}} />,
		generalSearch: true
	}

	componentDidMount = () => {
		const {filterValues} = this.state;
		if (filterValues && Object.keys(filterValues).length) {
			this.fetchIds();
		}
	}

	initialState = () => {
		let userNavigation;
		let initialState = {
			page: this.defaultPage,
			itemsPerPage: this.defaultItemsPerPage,
			filterValues: undefined,
			toggledFilters: [],
			currentElem: undefined,
			checkAll: false,
			checkedElems: [],
			currentSort: this.defaultSort()
		};

		const {id, location} = this.props;

		// get user navigation from localStorage by splitView id
		const userNavigInLocalStorage = getUserNavigationInLocalStorage(id);
		if (userNavigInLocalStorage && IsJsonString(userNavigInLocalStorage)){
			userNavigation = userNavigInLocalStorage;
		}

		// get user navigation from url
		const userNavigInUrl = getUserNavigationInUrl(location);
		if (userNavigInUrl && IsJsonString(userNavigInUrl)) {
			userNavigation = userNavigInUrl;
		}

		if (userNavigation) {
			const {page, itemsPerPage, filterValues, toggledFilters, currentSort, currentElem} = JSON.parse(userNavigation);
			const validFilterValues = this.getValidFilterValues(filterValues);
			const validToggledFilters = this.getValidToggledFilters(toggledFilters, validFilterValues);
			const validCurrentSort = this.getValidSort(currentSort);
			initialState = {
				...initialState,
				page: page || this.defaultPage,
				itemsPerPage: itemsPerPage || this.defaultItemsPerPage,
				filterValues: validFilterValues || undefined,
				toggledFilters: validToggledFilters || [],
				currentSort: validCurrentSort ? validCurrentSort : initialState.currentSort,
				currentElem: currentElem,
			};
		}

		return initialState;

	}

	pickFiltersValue = (values, filters) => {
		let filtersValue = {};
		values = dot.object(values);
		for (let i in filters) {
			const filterName = filters[i].id;
			filtersValue[filterName] = dot.pick(filterName, values);
		}
		return JSON.parse(JSON.stringify(filtersValue));
	};

	allFilters = () => {
		const {filters, generalSearch} = this.props;
		if (generalSearch) {
			return [this.generalSearchFilter, ...filters];
		}
		return filters;
	}

	getValidSort = (sort) => {
		if (!sort) {
			return;
		}
		const {sorts} = this.props;
		if (!sorts.find(s => s.id === sort.id)) {
			return;
		}
		return {
			id: sort.id,
			way: sort.way === ASC || sort.way === DESC ? sort.way : ASC
		};
	}

	getValidFilterValues = (filterValues) => {
		if (!filterValues) {
			return;
		}
		return this.pickFiltersValue(filterValues, this.allFilters());
	}

	getValidToggledFilters = (toggledFilters, validFilterValues) => {
		if (!toggledFilters) {
			return;
		}
		let validToggled = [];
		toggledFilters.forEach(filterId => {
			if (this.allFilters().find(filter => filter.id === filterId)) {
				validToggled.push(filterId);
			}
		});
		if (!validFilterValues) {
			return validToggled;
		}
		for (let filterId in validFilterValues) {
			if (!toggledFilters.find(id => id === filterId)) {
				validToggled.push(filterId);
			}
		}
		return validToggled;
	}

	saveUserNavigation = () => {
		// save user navigation states in localStorage and browser url
		// page, itemsPerPage, filterValues, toggledFilters, currentSort, currentElem
		const {id, history, location} = this.props;
		const {
			page, itemsPerPage, filterValues,
			toggledFilters, currentSort, currentElem
		} = this.state;

		// save in browser url
		saveUserNavigationInUrl(
			{page, itemsPerPage, filterValues, toggledFilters, currentSort, currentElem},
			history,
			location
		);

		// save in localStorage
		saveUserNavigationInLocalStorage(
			JSON.stringify({page, itemsPerPage, filterValues, toggledFilters, currentSort, currentElem}),
			id
		);
	}

	paginationOnChange = (page, pageSize, focusLast) => {
		this.setState({
			page: page,
			itemsPerPage: pageSize,
			currentElem: undefined
		}, () => {
			this.fetchCurrentPageElements(focusLast);
			this.saveUserNavigation();
		});
	}

	fetchIds = (refresh) => {
		const {page, currentElem} = this.state;
		this.setState(
			// reset list to page one, remove detail view elem if force refresh
			{
				page: refresh ? 1 : page,
				currentElem: refresh ? undefined : currentElem,
			},
			async () => {
				const {filterValues, currentSort} = this.state;
				const params = {
					...filterValues,
					[`order[${currentSort.id}]`]: currentSort.way
				};
				await this.props.fetchIds(JSON.parse(JSON.stringify(params)));
				this.fetchCurrentPageElements();
				this.saveUserNavigation();
			}
		);
	}

	fetchCurrentPageElements = (focusLast) => {
		this.setState(
			// clear list checked elements
			{
				checkAll: false,
				checkedElems: []
			},
			async () => {
				const {ids, fetchByIds} = this.props;
				const {page, itemsPerPage, currentSort} = this.state;
				const firstIdx = (page - 1) * itemsPerPage;
				let lastIdx = firstIdx + itemsPerPage - 1;
				if (lastIdx > ids.length - 1) {
					lastIdx = ids.length - 1;
				}
				const pageElemsIds = ids.slice(firstIdx, lastIdx + 1);
				await fetchByIds({
					id: pageElemsIds,
					[`order[${currentSort.id}]`]: currentSort.way
				});
				this.focusOnElement(focusLast);
			}
		);
	}

	focusOnElement = (focusLast) => {
		let elemKey;
		const {currentElem} = this.state;
		const {listElements} = this.props;
		if (!listElements || !listElements.length) {
			return;
		}
		if (focusLast) {
			// focus on last element of the list
			elemKey = listElements[listElements.length - 1].key;
		} else if (currentElem && listElements.find(elem => elem.key === currentElem)) {
			// if currentElem key is defined and its in the list
			elemKey = currentElem;
		} else {
			// else focus on the first element of the list
			elemKey = listElements[0].key;
		}
		this.listElemOnFocus(elemKey);
	}

	listElemOnFocus = (key) => {
		this.setState({currentElem: key}, () => this.saveUserNavigation());

		// todo list body scroll to focused element
	}

	onToggleFilter = (filter) => {
		let toggledFilters = [...this.state.toggledFilters];
		const idx = toggledFilters.indexOf(filter.id);
		if (idx > -1) {
			toggledFilters.splice(idx, 1);
		} else {
			toggledFilters.push(filter.id);
		}
		this.setState({toggledFilters});
	}

	onFiltersSubmit = (filterValues) => {
		this.setState({
			filterValues: this.pickFiltersValue(filterValues, this.allFilters())
		}, () => this.fetchIds(true));
	}

	onCurrentSortChange = (sortId) => {
		let sort = {id: sortId};
		let way;
		const {currentSort} = this.state;
		if (sortId === currentSort.id) {
			way = currentSort.way === ASC ? DESC : ASC;
		} else {
			way = ASC;
		}
		sort.way = way;
		this.setState({currentSort: sort}, () => this.fetchIds(true));
	}

	defaultSort = () => {
		const {sorts, defaultSort} = this.props;
		if (!sorts || !sorts.length) {
			return undefined;
		}
		const sort = defaultSort || sorts[0];
		const {id, way} = sort;
		return {
			id,
			way: way ? way.toUpperCase() : ASC
		};
	}

	checkAllOnChange = (ev) => {
		const {listElements} = this.props;
		const checkAll = ev.target.checked;
		this.setState({
			checkAll,
			checkedElems: checkAll ? listElements : []
		});
	}

	listElemOnCheck = (elem, checked) => {
		let elems;
		const {checkedElems} = this.state;
		const idx = checkedElems.findIndex(el => el.id === elem.id);
		if (!checked && idx > -1) {
			elems = [...checkedElems];
			elems.splice(idx, 1);
		} else if (checked && idx === -1) {
			elems = [...checkedElems, elem];
		} else {
			return;
		}
		this.setState({checkedElems: elems});
	}

	render() {

		let splitViewBody;

		const {
			generalSearch, sorts, defaultSort, listElements, listElemComp, fetchingElem,
			className, ids, fetchingIds, fetchedIds, dashboardComp, fetchingByIds, listActions
		} = this.props;

		const {
			page, itemsPerPage, currentElem, checkedElems, toggledFilters, currentSort,
			checkAll, filterValues,
		} = this.state;

		const allFilters = this.allFilters();

		if (!fetchedIds && !fetchingIds) {
			splitViewBody = <PleaseSearch showAllCallback={() => this.fetchIds(true)} />;
		} else if (fetchedIds && (!ids || !ids.length)) {
			splitViewBody = <SplitViewEmpty />;
		} else if (fetchedIds && ids && ids.length) {
			const actions = listActions.map(action => {
				const {actionForCheckedElems} = action;
				if (actionForCheckedElems && (!checkedElems || !checkedElems.length)) {
					return {
						...action,
						disabled: true
					};
				} else {
					return action;
				}
			});
			splitViewBody = [
				<div key="split-view-list" className="split-view-list">
					<div className="list-header">
						<Checkbox className="list-check-all" checked={checkAll} onChange={(ev) => this.checkAllOnChange(ev)} />
						{
							sorts && sorts.length ?
								<SplitViewSorting
									sorts={sorts}
									defaultSort={defaultSort}
									currentSort={currentSort}
									currentSortOnChangeCallback={currentSort => this.onCurrentSortChange(currentSort)}
								/> : null
						}
						<Actions className="list-actions" primary={true} actions={actions} />
					</div>
					<div className="list-body" >
						<SplitViewListBody
							elems={listElements}
							currentElem={currentElem}
							checkAll={checkAll}
							checkedElems={checkedElems}
							listElemComp={listElemComp}
							listElemOnClickCallback={(key) => this.listElemOnFocus(key)}
							listElemOnCheckCallback={(elem, checked) => this.listElemOnCheck(elem, checked)}
						/>
						<Spin className="list-body-spin" spinning={fetchingByIds} />
					</div>
					{
						ids && ids.length ?
							<div className="list-footer">
								<SplitViewPagination
									total={ids.length}
									current={page}
									pageSize={itemsPerPage}
									pageSizeOptions={this.pageSizeOptions}
									paginationOnChangeCallback={
										(page, pageSize) => this.paginationOnChange(page, pageSize)
									}
								/>
							</div> : null
					}
				</div>,
				<div key="split-view-details" className="split-view-details">
					{
						currentElem && listElements && listElements.length &&
						listElements.find(elem => elem.key === currentElem) ?
							dashboardComp({
								ids,
								page,
								itemsPerPage,
								currentElem,
								elems: listElements,
								listElemOnFocusCallback: (key) => this.listElemOnFocus(key),
								paginationOnChangeCallback: (page, pageSize, focusLast) => {
									this.paginationOnChange(page, pageSize,focusLast);
								},
								elem: listElements.find(elem => elem.key === currentElem),
								key: listElements.find(elem => elem.key === currentElem).key
							}) : null
					}
					{fetchingByIds || fetchingElem ? <Spin size="large" className="details-spinner" /> : null}
					{!currentElem && !fetchingByIds ? <ClickListElemTip /> : null}
				</div>
			];
		}

		return <div className={`split-view-comp ${className}`}>
			{
				allFilters && allFilters.length ?
					<div className="filters-wrapper">
						<SplitViewFilters
							generalSearch={generalSearch}
							allFilters={allFilters}
							values={filterValues}
							toggledFilters={toggledFilters}
							filterOnToggleCallback={(filter) => this.onToggleFilter(filter)}
							filtersOnSubmitCallback={(filterValues) => this.onFiltersSubmit(filterValues)}
						/>
					</div> : null
			}
			<div className="split-view-body">
				{<Spin className={classNames('body-spinner',{shown: fetchingIds})} size="large" />}
				{splitViewBody}
			</div>
		</div>;
	}
}

export default withRouter(SplitView);