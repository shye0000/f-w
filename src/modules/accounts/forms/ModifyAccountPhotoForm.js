import React from 'react';
import apiClient from '../../../apiClient';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import FormComp from 'antd/lib/form';
import ImageUpload from '../../../components/ImageUpload';
import portraitImgExp from '../images/portrait.jpg';
import maskImg from '../images/mask.png';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';

class ModifyAccountPhotoForm extends React.Component {

	componentDidMount() {
		const { form, user } = this.props;
		form.setFieldsValue({
			profilePicture: user.profilePicture['@id']
		});
	}


	render() {
		const FormCompItem = FormComp.Item;
		const { form, user } = this.props;
		const { getFieldDecorator } = form;

		return (
			<FormComp onSubmit={this.handleSubmit}>
				<Row gutter={20} type="flex" align="top">
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('profilePicture')(
								<ImageUpload
									fileUri={user.profilePicture ? `${AppConfig.apiEntryPoint}${user.profilePicture.content_uri}` : undefined}
									label={<EditableTransWrapper><Trans>Photo du compte</Trans></EditableTransWrapper>}
									description={<EditableTransWrapper><Trans>Format portrait 3 / 4</Trans></EditableTransWrapper>}
									form={form}
									aspectRatio={3/4}
									apiClient={apiClient}
									takePhoto
									example={portraitImgExp}
									mask={maskImg}
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo1')(
								<ImageUpload
									label={'Photo 1'}
									description="Format 1 / 2.55"
									form={form}
									aspectRatio={1/2.55}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo2')(
								<ImageUpload
									label={'Photo 2'}
									description="Format 1 / 2.35"
									form={form}
									aspectRatio={1/2.35}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo3')(
								<ImageUpload
									label={'Photo 3'}
									description="Format 1 / 1.85"
									form={form}
									aspectRatio={1/1.85}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo4')(
								<ImageUpload
									label={'Photo 4'}
									description="Format 1 / 1.77 ( 9 / 16 )"
									form={form}
									aspectRatio={9/16}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo5')(
								<ImageUpload
									label={'Photo 5'}
									description="Format 1 / 1.66"
									form={form}
									aspectRatio={1/1.66}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo6')(
								<ImageUpload
									label={'Photo 6'}
									description="Format 1 / 1.33 (3 / 4)"
									form={form}
									aspectRatio={3/4}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo7')(
								<ImageUpload
									label={'Photo 7'}
									description="Format 1 / 1"
									form={form}
									aspectRatio={1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo8')(
								<ImageUpload
									label={'Photo 8'}
									description="Format 1.33 / 1 (4 / 3)"
									form={form}
									aspectRatio={4/3}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo9')(
								<ImageUpload
									label={'Photo 9'}
									description="Format 1.66 / 1"
									form={form}
									aspectRatio={1.66/1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo10')(
								<ImageUpload
									label={'Photo 10'}
									description="Format 1.77 / 1 (16 / 9)"
									form={form}
									aspectRatio={1.77/1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo11')(
								<ImageUpload
									label={'Photo 11'}
									description="Format 1.85 / 1"
									form={form}
									aspectRatio={1.85/1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo12')(
								<ImageUpload
									label={'Photo 12'}
									description="Format 2.35 / 1"
									form={form}
									aspectRatio={2.35/1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
					<Col xs={24} md={24}>
						<FormCompItem>
							{getFieldDecorator('photo13')(
								<ImageUpload
									label={'Photo 13'}
									description="Format 2.55 / 1"
									form={form}
									aspectRatio={2.55/1}
									apiClient={apiClient}
									takePhoto
									flexLayout
								/>
							)}
						</FormCompItem>
					</Col>
				</Row>
			</FormComp>
		);
	}
}
export default ModifyAccountPhotoForm;
