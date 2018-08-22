import React from 'react';
import classNames from 'classnames';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Form from 'antd/lib/form';
import Tooltip from 'antd/lib/tooltip';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './SplitViewFilters.scss';

class SplitViewFilters extends React.Component {

	componentDidMount = () => {
		const {values, form} = this.props;
		form.setFieldsValue(values);
	}

	filtersOnSubmitCallback = () => {
		const {form} = this.props;
		form.validateFields((err, values) => {
			if (err) return;
			this.props.filtersOnSubmitCallback(values);
		});
	}

	filterOnToggle = (filter) => {
		this.props.filterOnToggleCallback(filter);
	}

	generateFilters = () => {
		const {toggledFilters, form, allFilters, values} = this.props;
		const { getFieldDecorator } = this.props.form;
		let filters = [];
		toggledFilters.forEach(filterId => {
			const filter = allFilters.find(filter => filter.id === filterId);
			if (filter) {
				filters.push(filter);
			}
		});
		return filters.map(filter => {
			const {id, component, title} = filter;
			return <div
				key={id}
				className={classNames('filter-field', {'has-value': values && values[id]})}
			>
				<div className="filter-title">{title}:</div>
				<Form.Item>
					{getFieldDecorator(id)(React.cloneElement(
						component,
						{
							form,
							autoFocus: true,
							name: id,
							className: 'split-view-filter',
							size: 'small',
						}
					))}
				</Form.Item>
				<Tooltip
					title={<EditableTransWrapper><Trans>Enlever le filtre</Trans></EditableTransWrapper>}
					placement="topRight" arrowPointAtCenter
				>
					<Icon type="close-circle" className="remove-filter" onClick={() => this.filterOnToggle(filter)} />
				</Tooltip>
			</div>;
		});
	}

	generateFiltersMenu = () => {
		const {toggledFilters, allFilters} = this.props;
		return <Menu className="split-view-filters-menu">
			{(allFilters || []).map(filter => {
				const {id, title} = filter;
				const filterToggled = (toggledFilters || []).includes(id);
				return <Menu.Item
					key={id}
					onClick={() => this.filterOnToggle(filter)}
					disabled={filterToggled}
					className={classNames({'general-search': filter.generalSearch})}
				>
					<div>{title}</div>
				</Menu.Item>;
			})}
		</Menu>;
	}

	render() {
		const {toggledFilters} = this.props;
		return <div className="split-view-filters">
			<div className="filters-content-wrapper">
				{
					toggledFilters && toggledFilters.length ?
						<Form className="filters-content">
							{this.generateFilters()}
						</Form> : null
				}
				<Dropdown trigger={['click']} overlay={this.generateFiltersMenu()} placement="bottomLeft" >
					<Button className="add-filter" >
						<Icon type="plus" />
						<EditableTransWrapper><Trans>Filtres</Trans></EditableTransWrapper>
					</Button>
				</Dropdown>
			</div>
			<Button className="apply-filters" onClick={() => this.filtersOnSubmitCallback()} >
				<EditableTransWrapper><Trans>Appliquer les filtres</Trans></EditableTransWrapper>
			</Button>
		</div>;
	}
}

export default Form.create()(SplitViewFilters);