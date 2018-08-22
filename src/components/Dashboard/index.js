import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import DashboardHead from './DashboardHead';
import DashboardBody from './DashboardBody';
import './Dashboard.scss';

class Dashboard extends React.Component {

	state={
		width: '100%',
	}

	onResize = (width) => {
		this.setState({width});
	}

	render() {
		const {head, body} = this.props;
		const {width} = this.state;
		const className = this.props.className + ' dashboard';

		return <div className={className} ref={(node) => this.container = node}>
			<ReactResizeDetector handleWidth onResize={(width) => this.onResize(width)} />
			<DashboardHead
				width={width}
				bodyConfig={body}
				scrollContainer={this.container}
				{...head}
			/>
			<DashboardBody {...body}/>
		</div>;
	}
}

export default Dashboard;
