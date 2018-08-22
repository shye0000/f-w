import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import {Trans} from 'lingui-react';
import IconSvg from 'wbc-components/lib/IconSvg';
import arrowUpSvg from '../../../../icons/arrow-filter-up.svg';
import arrowDownSvg from '../../../../icons/arrow-filter-down.svg';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {ASC} from '../utils/constants';
import './SplitViewSorting.scss';

const SplitViewSorting = (props) => {

	let currentSortComp, currentSortId;

	const {sorts, currentSort, currentSortOnChangeCallback} = props;

	const currentToggledSort = sorts.find(s => s.id === currentSort.id);

	if (currentToggledSort) {
		const {title, id} = currentToggledSort;
		const {way} = currentSort;
		currentSortId = id;
		currentSortComp =  <span
			className="sort-button"
			onClick={() => currentSortOnChangeCallback(currentSort.id)}
		>
			<span className="sort-title">{title}</span>
			<SortWayIcon way={way} />
		</span>;
	}

	return <div className="split-view-sorting">
		<EditableTransWrapper><Trans>Trier par</Trans></EditableTransWrapper>
		{currentSortComp}
		<div className="sort-divider" />
		<Dropdown
			trigger={['click']}
			overlay={
				<Menu>
					{sorts.map(sort => <Menu.Item
						key={sort.id}
						onClick={() => currentSortOnChangeCallback(sort.id)}
						disabled={currentSortId === sort.id}
					>
						<div>{sort.title}</div>
					</Menu.Item>)}
				</Menu>
			}
		>
			<Icon type="caret-down" className="sort-select-icon" />
		</Dropdown>
	</div>;

};

const SortWayIcon = ({way}) => {
	if (!way) {
		return null;
	}
	return <IconSvg
		className="sort-way-icon"
		svg={way.toUpperCase() === ASC ? arrowUpSvg : arrowDownSvg}
		size={12}
	/>;
};

export default SplitViewSorting;