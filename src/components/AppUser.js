import React from 'react';
import {connect} from 'react-redux';
import './AppUser.scss';

const mapStateToProps = (state) => {
	return {
		authData: state.user.data
	};
};

class AppUser extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {authData} = this.props;

		const {user_informations} = authData;

		const {avatar, firstName, lastName} = user_informations;

		return (
			<div className="app-user">
				<div
					className="avatar"
					style={{backgroundImage: avatar ? `url(${AppConfig.apiEntryPoint}${avatar})` : '' }}>
					{
						!avatar ?
							`${firstName.charAt(0)}${lastName.charAt(0)}`
							: null
					}
				</div>
				<div className="user-name">
					{`${firstName} ${lastName}`}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, null)(AppUser);
