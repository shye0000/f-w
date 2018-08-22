import React from 'react';
import {Link} from 'react-router-dom';
import Tag from 'antd/lib/tag';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './AccountListElemComp.scss';

class AccountListElemComp extends React.Component {

	render() {
		const {firstName, lastName, email, enabled, profilePicture, id} = this.props.account;
		const fullName = `${firstName} ${lastName}`;
		return <div className="account-list-elem-comp">
			<div className="profile-photo" style={{
				backgroundImage: profilePicture ?
					`url(${AppConfig.apiEntryPoint}${profilePicture.content_uri})` : null
			}}>
				{
					!profilePicture ?
						`${firstName[0]}${lastName[0]}` : null
				}
			</div>
			<div className="info">
				<div className="name">
					<Link
						to={`/accounts/${id}`}
						title={fullName}
						onClick={ev => ev.preventDefault()}
					>
						{fullName}
					</Link>
				</div>
				<div className="email" title={email}>
					{email}
				</div>
				<div className="tags">
					<div className="state">
						{enabled ?
							<Tag color="#3FB05D">
								<EditableTransWrapper>
									<Trans>Actif</Trans>
								</EditableTransWrapper>
							</Tag>
							:
							<Tag color="#909091">
								<EditableTransWrapper>
									<Trans>Inactif</Trans>
								</EditableTransWrapper>
							</Tag>
						}
					</div>
					<div className="projects">

					</div>
				</div>
			</div>
		</div>;
	}
}

export default AccountListElemComp;