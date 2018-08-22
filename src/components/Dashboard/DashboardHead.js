import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Anchor from 'antd/lib/anchor';
import Affix from 'antd/lib/affix';
import Actions from '../Actions';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import './DashboardHead.scss';

class DashboardHead extends React.Component {

	state = {
		affixed : false,
		anchorOffsetTop: undefined,
	}

	getHeaderContent = () => {
		const { contents } = this.props;
		const nbColumn = contents && contents.length ? contents.length : 0;
		if (nbColumn) {
			return <div className="content">
				<Row gutter={24} type="flex">
					{
						contents.map((column, idx) => {
							return <Col key={idx} sm={24} md={24 / (nbColumn - 1)} lg={24 / nbColumn}>
								{
									column.length ?
										column.map((content, index) => {
											if (content) {
												return <div key={index} className="item">
													<Row gutter={10} type="flex" align="top">
														<Col xs={24} sm={24} md={8}>
															<span className="label">{content.label}</span>
														</Col>
														<Col xs={24} sm={24} md={16}>
															<span className="value">
																{content.value ? content.value : <div className="empty-label">N/A</div>}
															</span>
														</Col>
													</Row>
												</div>;
											}
										}) : null
								}
								{column.component}
							</Col>;
						})
					}
				</Row>
			</div>;
		}
		return null;
	};

	onResize = () => {
		this.setState({anchorOffsetTop: this.headContainer.getBoundingClientRect().height - 2});
	}
	render() {
		const {
			photo,
			photoComponent,
			extraActionComp,
			actionsNotPrimary,
			getActionsPopupContainer,
			actions,
			foot,
			title,
			subTitle,
			bodyConfig,
			scrollContainer,
			width
		} = this.props;
		const {affixed, anchorOffsetTop} = this.state;
		return <Affix
			target={() => scrollContainer}
			style={{width: `${width}px`}}
			onChange={(affixed) => this.setState({affixed})}
		>
			<div
				className={classNames('dashboard-head', {'fixed': affixed})}
				ref={node => this.headContainer = node}
			>
				<ReactResizeDetector handleHeight onResize={() => this.onResize()} />
				<div className="dashboard-head-content">
					{
						photo ? <div className="photo" style={{backgroundImage: `url(${photo})`}} /> : null
					}
					{
						photoComponent ?
							<div className="photo">
								<div className="component-wrapper">
									{photoComponent}
								</div>
							</div> : null
					}
					<div className="content-wrapper">
						<div className="top">
							<div className="top-main">
								<div className="title-wrapper">
									<div className="title">{title}</div>
									<div className="sub-title">{subTitle}</div>
								</div>
							</div>
							<div className="actions-wrapper">
								{extraActionComp ? extraActionComp : null}
								<Actions
									primary={!actionsNotPrimary} actions={actions}
									getPopupContainer={getActionsPopupContainer}/>
							</div>
						</div>
						{
							!affixed ?
								[
									<div key="content">{this.getHeaderContent()}</div>,
									<div key="foot">{foot ? <div className="bottom">
										{foot}
									</div> : null}</div>
								] : null
						}
					</div>
				</div>
				{bodyConfig && bodyConfig.anchors && scrollContainer ?
					<Anchor
						className="dashboard-head-anchor"
						getContainer={() => scrollContainer}
						offsetTop={anchorOffsetTop}
						affix={false}
					>
						{bodyConfig.anchors.map(anchor => {
							const {id, title} = anchor;
							return <Anchor.Link
								key={id}
								href={`#${id}`}
								title={title}
							/>;
						})}
					</Anchor> : null}
			</div>
		</Affix>;
	}
}

export default DashboardHead;