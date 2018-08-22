import React from 'react';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {checkUserHasRights} from '../../modules/utils/userRightsManagement';
import './Action.scss';

class Action extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false
		};
	}

	actionOnClick = (ev, action, actionDisabled) => {
		if (!action.modal && !action.method) {
			return;
		}
		ev.preventDefault();
		if (actionDisabled) {
			return;
		}
		if (action.actionTriggeredCallback) {
			action.actionTriggeredCallback();
		}
		if (action.modal) {
			this.setState({modalVisible: true});
		} else if (action.method) {
			action.method();
		}
	}

	modalCloseCallback = (action, refresh, data) => {
		this.setState({modalVisible: false});
		if (action.modalCloseCallback) {
			action.modalCloseCallback(refresh, data);
		}
	}

	getActionComp = (hasRights, disabled, disabledReason) => {
		let actionInner;
		const {action, renderAsButton, size, renderAsButtonWithTitle} = this.props;
		let tooltipTitle;
		const actionDisabled = !hasRights || disabled;

		if (!hasRights) {
			tooltipTitle = <div>{'Vous n\'avez pas le droit d\'effectuer cette action.'}</div>;
		}

		if (hasRights && disabled && disabledReason) {
			tooltipTitle = <div>{disabledReason}</div>;
		}

		if (renderAsButton) {
			tooltipTitle = <div>
				<div style={{fontWeight: 'bold'}}>{action.title}</div>
				{tooltipTitle}
			</div>;
		}

		if (renderAsButtonWithTitle || action.renderAsButtonWithTitle) {
			actionInner = <Button
				type={action.type}
				disabled={actionDisabled}
				size={size} onClick={(ev) => this.actionOnClick(ev, action, actionDisabled)}>
				{action.icon} {action.title}
			</Button>;
		} else if (renderAsButton) {
			actionInner = <Button
				type={action.type}
				disabled={actionDisabled}
				size={size} onClick={(ev) => this.actionOnClick(ev, action, actionDisabled)}>
				{action.icon}
			</Button>;
		} else {
			actionInner = <div
				className={classNames('popover-content', {
					disabled: actionDisabled,
					danger: action.type === 'danger'
				})}
				onClick={(ev) => this.actionOnClick(ev, action, actionDisabled)}>
				<div className="action-icon">
					{action.icon}
				</div>
				<div className="action-title">
					{action.title}
				</div>
			</div>;
		}

		if (action.link) {
			actionInner = <div>
				<Link to={action.link} disabled={actionDisabled} onClick={e => actionDisabled && e.preventDefault()}>
					{actionInner}
				</Link>
			</div>;
		}
		if (action.staticLink) {
			actionInner = <div>
				<a
					href={action.staticLink}
					disabled={actionDisabled}
					onClick={e => actionDisabled && e.preventDefault()}
					target="_blank"
					rel="noopener noreferrer"
				>
					{actionInner}
				</a>
			</div>;
		}
		return <Tooltip title={tooltipTitle} arrowPointAtCenter placement="topRight">
			{actionInner}
		</Tooltip>;
	}

	render () {
		const {action} = this.props;
		const {modalVisible} = this.state;
		const hasRights = checkUserHasRights(action.requiredRights);
		const actionComp = this.getActionComp(hasRights, action.disabled, action.disabledReason);
		let modal;
		if (action.modal) {
			modal = React.cloneElement(
				action.modal,
				{
					visible: modalVisible,
					onCloseCallback: (refresh, data) => this.modalCloseCallback(action, refresh, data)
				}
			);
		}
		return <div className="action">
			{actionComp}
			{modal}
		</div>;
	}
}

export default Action;
