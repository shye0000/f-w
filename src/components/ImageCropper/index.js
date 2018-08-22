import React from 'react';
import Cropper from 'react-cropper';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import 'cropperjs/dist/cropper.css';
import './ImageCropper.scss';

class ImageCropper extends React.Component {

	previewWidth = 200

	render () {
		const {aspectRatio, uploading, fileSrc} = this.props;
		return <Spin spinning={uploading} >
			<Row className="image-cropper"  gutter={24} type="flex" align="top">
				<Col className="cropper" xs={24} md={16}>
					<Cropper
						ref={cropper => { this.cropper = cropper; }}
						src={fileSrc}
						style={{height: 400, width: '100%'}}
						aspectRatio={aspectRatio}
						autoCrop
						viewMode={2}
						preview=".image-cropper-preview"
					/>
					<Button.Group className="cropper-actions">
						<Button onClick={() => this.cropper.zoom(0.1)} >
							<Icon type="plus" />
						</Button>
						<Button onClick={() => this.cropper.zoom(-0.1)} >
							<Icon type="minus" />
						</Button>
						<Button onClick={() => this.cropper.rotate(-5)} >
							<Icon type="reload" className="flipped" />
						</Button>
						<Button onClick={() => this.cropper.rotate(5)}>
							<Icon type="reload" />
						</Button>
					</Button.Group>
				</Col>
				<Col className="preview-wrapper" xs={24} md={8}>
					<div
						className="image-cropper-preview"
						style={{
							overflow: 'hidden',
							width: this.previewWidth,
							height: aspectRatio ? this.previewWidth / aspectRatio : this.previewWidth
						}}
					/>
				</Col>
			</Row>
		</Spin>;
	}

}

export default ImageCropper;