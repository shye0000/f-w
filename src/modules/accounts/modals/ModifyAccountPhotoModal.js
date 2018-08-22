import React from 'react';
import ModifyAccountPhotoForm from '../forms/ModifyAccountPhotoForm';
import ActionModalForm from '../../../components/ActionModalForm/index';
import {Trans, withI18n} from 'lingui-react';
import notification from 'antd/lib/notification';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {connect} from 'react-redux';
import {actions, MODIFY_USER} from '../redux';



class ModifyAccountPhotoModal extends ActionModalForm {
	constructor(props) {
		super(props, ModifyAccountPhotoForm, <div className="modal-title">
			<EditableTransWrapper><Trans>Modifier la photo du compte</Trans></EditableTransWrapper>
		</div>, <EditableTransWrapper><Trans>Modifier</Trans></EditableTransWrapper>);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const {i18n, modifyUser, user} = this.props;
		this.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			this.setState({confirmLoading: true});
			modifyUser(user['@id'], {
				profilePicture: values.profilePicture
			}).then(
				() => {
					this.setState({confirmLoading: false}, () => this.props.onCloseCallback());
					notification['success']({
						message: i18n.t`La photo du compte a été bien modifiée.`,
						className: 'app-notification success'
					});
				},
				() => {
					this.setState({confirmLoading: false});
					notification['error']({
						message: i18n.t`La photo du compte n'a pas été modifié.`,
						className: 'app-notification error'
					});
				}
			);
		});
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		modifyUser: (userUri, params) => dispatch(actions[MODIFY_USER](userUri, params)),
	};
};

export default connect(null, mapDispatchToProps)(withI18n()(ModifyAccountPhotoModal));