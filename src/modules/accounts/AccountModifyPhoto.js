import React from 'react';
import FormComp from 'antd/lib/form';
import {Trans, withI18n} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import Icon from 'antd/lib/icon';
import Card from 'antd/lib/card';
import Spin from 'antd/lib/spin';
import Button from 'antd/lib/button';
import ModifyAccountPhoto from './forms/ModifyAccountPhotoForm';
import notification from 'antd/lib/notification/index';
import {connect} from 'react-redux';
import {ACCOUNTS_FETCH_USER, actions, MODIFY_USER, RESOURCE} from './redux';

class AccountModifyPhoto extends React.Component {

	handleSubmit = (e) => {
		e.preventDefault();
		const {i18n, modifyUser, match, form} = this.props;
		const {accountId} = match.params;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}
			modifyUser(`${RESOURCE}/${accountId}`, {
				profilePicture: values.profilePicture
			}).then(
				() => {
					notification['success']({
						message: i18n.t`La photo du compte a été bien modifiée.`,
						className: 'app-notification success'
					});
					this.props.history.push(`/accounts/${accountId}`);
				},
				() => {
					notification['error']({
						message: i18n.t`La photo du compte n'a pas été modifié.`,
						className: 'app-notification error'
					});
				}
			);
		});
	}

	componentDidMount() {
		this.props.fetchUser(this.props.match.params.accountId);
	}

	render() {
		const { form, user, fetchingUser } = this.props;
		if (fetchingUser) {
			return <Spin className="centered-spin" size="large" />;
		}
		if (user) {
			return <div className="form">
				<div className="form-content">
					<Card title={
						<div className="form-title">
							<Icon type="edit" />
							<EditableTransWrapper><Trans>{'Modifier la photo du compte'}</Trans></EditableTransWrapper>
						</div>
					}>
						<ModifyAccountPhoto form={form} user={user} />
						<div className="form-buttons">
							<Button size="large">
								<EditableTransWrapper><Trans>Annuler</Trans></EditableTransWrapper>
							</Button>
							<Button size="large" type="primary" onClick={e => this.handleSubmit(e)}>
								<EditableTransWrapper><Trans>Modifier</Trans></EditableTransWrapper>
							</Button>
						</div>
					</Card>
				</div>
			</div>;
		}
		return <div className="empty-tag">
			<EditableTransWrapper><Trans>{'User non existé'}</Trans></EditableTransWrapper>
		</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		user: state[RESOURCE].user,
		fetchingUser: state[RESOURCE].fetchingUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		modifyUser: (userUri, params) => dispatch(actions[MODIFY_USER](userUri, params)),
		fetchUser: (userId) => dispatch(actions[ACCOUNTS_FETCH_USER](userId)),
	};
};

const WrappedFormComp = FormComp.create()(connect(mapStateToProps, mapDispatchToProps)(withI18n()(AccountModifyPhoto)));

export default WrappedFormComp;