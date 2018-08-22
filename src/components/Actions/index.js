import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import Action from '../Action';
import classNames from 'classnames';
import './Actions.scss';
import {checkUserHasRights} from '../../modules/utils/userRightsManagement';

class Actions extends React.Component {

	state = {
		visible: false,
	}

	handleVisibleChange = (visible) => {
		this.setState({ visible });
	}

	hide = () => {
		this.setState({ visible: false });
	}

	getPopoverContent = (moreActions) => {
		return <Menu className="popover-rows" onClick={() => this.hide()}>
			{
				moreActions.map((action) => {
					const hasRights = checkUserHasRights(action.requiredRights);
					const actionDisabled = !hasRights || action.disabled;
					return <Menu.Item key={action.id} disabled={actionDisabled}>
						<Action action={action}/>
					</Menu.Item>;
				})
			}
		</Menu>;
	}

	getActions = () => {
		let unfoldedActions = [], moreActions = [];
		const {actions, primary, size, getPopupContainer, placement} = this.props;
		const {visible} = this.state;
		actions.forEach(function(action) {
			if (!action) {
				return;
			}
			if (action.unfolded) {
				unfoldedActions.push(action);
			} else {
				moreActions.push(action);
			}
		});
		const withMoreActions = moreActions && moreActions.length;
		return (
			<div className={classNames('actions', {
				'visible': visible
			})}>
				{
					unfoldedActions.map((action, idx) => {
						return <Action
							renderAsButton={true}
							size={size}
							key={idx.toString()}
							action={action}
						>{action.icon}</Action>;
					})
				}
				{
					withMoreActions ?
						<div className="more-actions">
							<Dropdown
								placement={placement || 'bottomRight'}
								getPopupContainer={getPopupContainer}
								overlay={this.getPopoverContent(moreActions)}
								visible={visible}
								onVisibleChange={this.handleVisibleChange}
								trigger={['click']} arrowPointAtCenter>
								<Button
									size={size}
									className="actions-button"
									type={primary ? 'primary' : ''}
									icon="ellipsis"/>
							</Dropdown>
						</div> : null
				}
			</div>
		);
	}

	render () {
		const {actions} = this.props;
		const withActions = actions && actions.length;
		return (withActions ? this.getActions() : null);
	}
}

export default Actions;
