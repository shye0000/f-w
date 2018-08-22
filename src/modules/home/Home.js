import React from 'react';
import {connect} from 'react-redux';
import Card from 'antd/lib/card';
import QueueAnim from 'rc-queue-anim';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './Home.scss';

class Home extends React.Component {
	render() {

		const {authData} = this.props;

		const {user_informations} = authData;

		const {avatar, firstName, lastName} = user_informations;

		return (
			<div className="home">
				<Card>
					<QueueAnim
						animConfig={[
							{ opacity: [1, 0], translateY: [0, 30] },
							{ opacity: [1, 0], translateY: [0, -30] }
						]}
					>
						{
							user_informations ?
								[
									<div key="user-name" className="user-name">
										<EditableTransWrapper>
											<Trans>Bienvenue</Trans>
										</EditableTransWrapper>
										{` ${firstName} ${lastName}`}
									</div>,
									<div
										key="user-avatar"
										className="user-avatar"
										style={{backgroundImage: avatar ? `url(${AppConfig.apiEntryPoint}${avatar})` : '' }}>
										{
											!avatar ?
												`${firstName.charAt(0)}${lastName.charAt(0)}`
												: null
										}
									</div>
								] : null
						}
					</QueueAnim>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authData: state.user.data
	};
};

export default connect(mapStateToProps, null)(Home);