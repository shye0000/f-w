import React from 'react';
import Upload from 'antd/lib/upload';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import notification from 'antd/lib/notification';
import Tooltip from 'antd/lib/tooltip';
import ImageCropper from '../ImageCropper';
import WebcamWrapper from '../WebcamWrapper';
import classNames from 'classnames';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './ImageUpload.scss';

class ImageUpload extends React.Component {

	state = {
		uploading: false,
		file: null,
		previewUri: this.props.fileUri,
		cropperFileSrc: null,
		cropperModalVisible: false,
		imgExpModalVisible: false,
		takePhotoModalVisible: false,
	}

	validImageTypes = ['image/jpeg', 'image/png'];

	previewHeight = 120

	videoWidth = 640

	videoHeight = 480

	defaultImageType = 'image/jpeg'

	getModalWidth = () => {
		let width;
		const {aspectRatio} = this.props;
		if (aspectRatio && aspectRatio <= 1) {
			width = this.videoHeight * aspectRatio;
		} else if (aspectRatio && aspectRatio > 1) {
			width = this.videoWidth;
		} else {
			width = this.videoHeight;
		}
		return width;
	}

	async initFileFromDataURL (dataURL, file = {
		name: 'picture',
		type: this.defaultImageType
	}) {
		const res = await fetch(dataURL);
		const buf = await res.arrayBuffer();
		return new File([buf], file.name, {type: file.type});
	}

	uploadImageFile = (imageFile) => {
		const {apiClient, form, id} = this.props;
		const formData = new FormData();
		formData.append('attachment', imageFile);
		return new Promise((resolve) => {
			apiClient.fetch('/files/upload', {
				method: 'POST',
				body: formData
			}).then(
				null,
				({response}) => {
					this.setState({uploading: false});
					if (response.status === 201) {
						notification['success']({
							message: 'L\'image a bien été téléchargé.',
							className: 'app-notification success'
						});
						response.json().then((body) => {
							this.setState({
								previewUri: `${AppConfig.apiEntryPoint}${body['@id']}/content/secret/${body.secret}`
							});
							form.setFieldsValue({[id]: body['@id']});
							resolve();
						});

					} else {
						notification['error']({
							message: 'L\'image n\'a pas été téléchargé.',
							className: 'app-notification error'
						});
					}
				}
			);
		});
	}

	async updateWebcamPhoto(dataURL) {
		const webcamFile = await this.initFileFromDataURL(dataURL);
		this.uploadImageFile(webcamFile).then(
			() => {
				this.setState({
					takePhotoModalVisible: false,
				});
			}
		);
	}

	async cropImageAndUpload() {
		if (typeof this.cropperContent.cropper.getCroppedCanvas() === 'undefined') {
			return;
		}
		const cropResult = this.cropperContent.cropper.getCroppedCanvas().toDataURL();
		this.setState({uploading: true});
		const {file} = this.state;
		const croppedFile = await this.initFileFromDataURL(cropResult, file || undefined);
		this.uploadImageFile(croppedFile).then(
			() => {
				this.setState({
					cropperModalVisible: false,
				});
			}
		);
	}

	removeImage = () => {
		const {form, id} = this.props;
		this.setState({
			file: null,
			cropperFileSrc: null,
			previewUri: null,
		});
		form.setFieldsValue({[id]: undefined});
	}

	onCropStart = () => {
		this.setState({
			cropperModalVisible: true,
			cropperFileSrc: this.state.previewUri
		});
	}

	render() {
		const {uploading, previewUri, cropperFileSrc, cropperModalVisible, imgExpModalVisible, takePhotoModalVisible} = this.state;
		const {label, description, aspectRatio, required, example, takePhoto, mask, flexLayout} = this.props;
		const modalWith = this.getModalWidth();
		const uploaderProps = {
			name: 'file',
			showUploadList: false,
			customRequest: ({file}) => {
				if (this.validImageTypes.includes(file.type)) {
					const fr = new FileReader();
					fr.onload =  (ev) => {
						this.setState({
							file,
							cropperFileSrc: ev.target.result,
							cropperModalVisible: true
						});
					};
					fr.readAsDataURL(file);
				} else {
					notification['error']({
						message: `${file.name} n'est pas une image.`,
						className: 'app-notification error'
					});
				}
			}
		};

		return (
			<Spin spinning={uploading}>
				<div className="image-upload">
					{
						label ?
							<div className="label">
								{label}
								{required ? <span style={{margin: '0 8px 0 2px'}}>*</span> : null}
							</div> : null
					}
					<div className={classNames('body', {'flex-layout': flexLayout})} >
						<div
							className="preview"
							style={{
								backgroundImage: previewUri ? `url(${previewUri})` : null,
								width: aspectRatio ? this.previewHeight * aspectRatio : this.previewHeight,
								height: this.previewHeight
							}}
						>
							{
								previewUri ?
									<div className="preview-action" >
										<Tooltip placement="top" title="Recropper" >
											<Icon type="edit" onClick={() => this.onCropStart()} />
										</Tooltip>
										<Tooltip placement="top" title="Supprimer" >
											<Icon type="delete" onClick={() => this.removeImage()} />
										</Tooltip>
									</div>
									:
									<div className="preview-empty">
										<Icon type="picture" />
									</div>
							}
						</div>
						<div>
							{description ? <div className="description">{description}</div> : null}
							{example ? <a
								className="example"
								onClick={ev => {
									ev.preventDefault();
									this.setState({imgExpModalVisible: true});
								}}
							>
								<EditableTransWrapper><Trans>Voir un exemple</Trans></EditableTransWrapper>
							</a> : null }
							<div className="img-actions">
								{takePhoto ? <Button className="take-photo-button" onClick={() => this.setState({takePhotoModalVisible: true})} >
									<Icon type="camera-o" />
									<EditableTransWrapper><Trans>Prendre une photo</Trans></EditableTransWrapper>
								</Button> : null }
								<Upload {...uploaderProps} >
									<Button>
										<Icon type="upload" />
										<EditableTransWrapper><Trans>Sélectionner une image</Trans></EditableTransWrapper>
									</Button>
								</Upload>
							</div>
						</div>
					</div>
				</div>
				<Modal
					width={750}
					title={<div>
						<div className="modal-main-title">{label}</div>
						<div>{description}</div>
					</div>}
					visible={cropperModalVisible}
					onCancel={() => this.setState({cropperModalVisible: false})}
					onOk={() => !uploading && this.cropImageAndUpload()}
					destroyOnClose
				>
					<ImageCropper
						uploading={uploading}
						fileSrc={cropperFileSrc}
						aspectRatio={aspectRatio}
						ref={cropperContent => this.cropperContent = cropperContent}
					/>
				</Modal>
				{
					example ?
						<Modal
							title={<div>
								<div className="modal-main-title">Exemple: {label}</div>
								<div>{description}</div>
							</div>}
							width={modalWith}
							wrapClassName="img-example"
							visible={imgExpModalVisible}
							onCancel={() => this.setState({imgExpModalVisible: false})}
							footer={null}
							destroyOnClose
						>
							<img src={example} />
						</Modal> : null
				}
				{
					takePhoto ?
						<Modal
							title={<div>
								<div className="modal-main-title">{label}</div>
								<div>{description}</div>
							</div>}
							visible={takePhotoModalVisible}
							onCancel={() => this.setState({takePhotoModalVisible: false})}
							footer={null}
							destroyOnClose
							wrapClassName="webcam-modal"
							width={modalWith}
						>
							<WebcamWrapper
								mask={mask}
								aspectRatio={aspectRatio}
								videoWidth={this.videoWidth}
								videoHeight={this.videoHeight}
								captureCallback={(src) => this.updateWebcamPhoto(src)}
							/>
						</Modal> : null
				}
			</Spin>
		);
	}

}
export default ImageUpload;