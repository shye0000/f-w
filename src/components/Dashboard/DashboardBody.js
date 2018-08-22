import React from 'react';
import classNames from 'classnames';
import Col from 'antd/lib/col';
import DashboardBox from './DashboardBox';
import Masonry from 'react-masonry-component';
import {checkUserHasRights} from '../../modules/utils/userRightsManagement';
import './DashboardBody.scss';

class DashboardBody extends React.Component {

	boxes = (this.props.boxes || []).map((box) => {
		const nbColumn = this.props.boxesColumnNb || 3;
		let bigColumn = 16;
		if (nbColumn === 2) {
			bigColumn = 24;
		}
		if (checkUserHasRights(box.requiredRights)) {
			return <Col className={classNames('box-wrapper', {
				'box-wrapper-big': box.big,
				'box-wrapper-normal': !box.big
			})} key={box.id} xs={24} sm={24} md={box.big ? 24 : (24 / (nbColumn -1))} lg={box.big ? bigColumn : (24 / nbColumn)}>
				<DashboardBox key={box.id} config={box} />
			</Col>;
		}
	})

	render() {

		let body;
		const {fixedLayout, fixedLayoutBody} = this.props;
		if (fixedLayout) {
			body = fixedLayoutBody;
		} else {
			const masonryOptions = {
				transitionDuration: 0,
				columnWidth: '.box-wrapper-normal'
			};
			body = <Masonry
				options={masonryOptions}
				enableResizableChildren={true}
				className="boxes-wrapper">
				{this.boxes}
			</Masonry>;
		}

		return <div className="dashboard-body">
			{body}
		</div>;

	}
}

export default DashboardBody;