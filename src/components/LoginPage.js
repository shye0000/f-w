import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import apiClient from '../apiClient';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import {LanguageSelect} from 'wbc-components/lib/Translations';
import {withI18n, Trans} from 'lingui-react';

import './LoginPage.scss';

const mapDispatchToProps = (dispatch) => {
	return {
		login: (data) => {
			dispatch(apiClient.login(data));
		}
	};
};

class LoginPage extends React.Component {
	handleSubmit = (ev) => {
		ev.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.login(values);
			}
		});
	}

	render() {
		const FormItem = Form.Item;

		const { getFieldDecorator } = this.props.form;
		const {i18n} = this.props;
		return (
			<Form onSubmit={this.handleSubmit} className="login-page">
				<Card className="login-form" style={{ width: 450 }}>
					<div className="welcome-message">
						<Trans>Bienvenue</Trans>
					</div>
					<div className="app-title">Fondations</div>
					<FormItem>
						{getFieldDecorator('_username', {
							rules: [{ required: true, message: i18n.t`Veuillez renseigner votre email` }]
						})(
							<Input
								prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder={i18n.t`Votre adresse mail`} size="large" className="login-input"
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('_password', {
							rules: [{ required: true, message: i18n.t`Veuillez renseigner votre mot de passe` }],
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password" placeholder={i18n.t`Votre mot de passe`} size="large"
								className="login-input"
							/>
						)}
					</FormItem>
					<FormItem>
						<Button type="primary" size="large" htmlType="submit" className="login-form-button">
							<Trans>Connectez-vous</Trans>
						</Button>
					</FormItem>
					<LanguageSelect />
					<div className="login-form-forgot">
						<Link disabled={true} to="/todo">
							<Trans>Mot de passe oublié</Trans>
						</Link>
					</div>
				</Card>
			</Form>
		);
	}

}

export default connect(null, mapDispatchToProps)(Form.create()(withI18n()(LoginPage)));