import React from 'react';
import Button from 'antd/lib/button';
import Webcam from 'react-webcam';
import classNames from 'classnames';
import './WebcamWrapper.scss';

class WebcamWrapper extends React.Component {

	state={
		captureSrc: null,
	}

	defaultImageType = 'image/jpeg'

	async capture() {
		const {videoWidth, videoHeight} = this.props;
		const {width, height} = this.getSize();
		const resultCanvas = this.webcamWrapper.getElementsByClassName('webcam-result');
		const ctx = resultCanvas[0].getContext('2d');
		const x = (videoWidth - width) / 2;
		const y = (videoHeight - height) / 2;
		ctx.drawImage(this.webcam.video, x, y, width, height, 0, 0, width, height );
		const captureSrc = resultCanvas[0].toDataURL(this.defaultImageType);
		this.setState({captureSrc});

	}

	redo = () => {
		this.setState({captureSrc: null});
	}

	confirm = () => {
		const {captureSrc} = this.state;
		this.props.captureCallback(captureSrc);
	}

	getSize = () => {
		const {aspectRatio, videoHeight, videoWidth} = this.props;
		if (aspectRatio && aspectRatio <= 1) {
			return {
				width: videoHeight * aspectRatio,
				height: videoHeight,
			};
		} else if (aspectRatio && aspectRatio > 1) {
			return {
				width: videoWidth,
				height: videoWidth / aspectRatio
			};
		} else {
			return {
				width: videoHeight,
				height: videoHeight
			};
		}
	}

	render () {

		const {width, height} = this.getSize();

		const {mask, videoHeight, videoWidth} = this.props;

		const {captureSrc} = this.state;

		return <div ref={webcamWrapper => this.webcamWrapper = webcamWrapper} className="webcam-wrapper">
			<div className="video-wrapper" style={{width, height}}>
				<Webcam
					className="video"
					ref={webcam => this.webcam = webcam}
					screenshotFormat={this.defaultImageType}
					width={videoWidth}
					height={videoHeight}
				/>
				<canvas className={classNames('webcam-result', {hidden: !captureSrc})} width={width} height={height} />
				{
					mask ? <img
						style={{
							height,
							width: 'auto'
						}}
						className="img-mask"
						src={mask}
					/> : null
				}
			</div>
			<div className="buttons-wrapper">
				{
					captureSrc ?
						[
							<Button
								key="redo"
								className="webcam-button"
								shape="circle"
								icon="reload"
								size="large"
								onClick={() => this.redo()}>
							</Button>,
							<Button
								key="ok"
								className="webcam-button"
								type="primary"
								shape="circle"
								icon="check"
								size="large"
								onClick={() => this.confirm()}>
							</Button>
						]
						:
						<Button
							className="webcam-button"
							type="primary"
							shape="circle"
							icon="camera"
							size="large"
							onClick={() => this.capture()}>
						</Button>
				}
			</div>
		</div>;
	}
}

export default WebcamWrapper;