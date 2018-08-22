import React from 'react';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import Actions from '../Actions';
import classNames from 'classnames';
import './DashboardBox.scss';

class DashboardBox extends React.Component {

	state = {collapsed: this.props.config.defaultCollapsed}

	onChange = (activeKey) => {
		const {config} = this.props;
		if (activeKey.find(key => key === config.id)) {
			this.setState({collapsed: false});
		} else {
			this.setState({collapsed: true});
		}
	}

	render() {
		const Panel = Collapse.Panel;
		const {config, className} = this.props;
		const {collapsed} = this.state;
		return <div id={config.id} className={className}>
			<Collapse
				className="dashboard-box"
				defaultActiveKey={config.defaultCollapsed ? null : [config.id]}
				onChange={(activeKey) => this.onChange(activeKey)}
			>
				<Panel
					key={config.id}
					showArrow={false}
					header={
						!config.hideTitle ?
							<div className="title-wrapper">
								<div className="title">
									<div className="title-icon">{config.icon}</div>
									<div className="title-content">{config.title}</div>
									<Icon type="up" className={classNames('collapse-icon', {collapsed})} />
								</div>
								<div className="box-actions" onClick={ev => ev.stopPropagation()}>
									<div className="box-actions-wrapper"><Actions  actions={config.actions} /></div>
								</div>
							</div> : null
					}
				>
					<div className="box-content">
						{config.content}
					</div>
				</Panel>
			</Collapse>
		</div>;
	}
}

export default DashboardBox;