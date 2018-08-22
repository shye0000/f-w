import React from 'react';
import './ProfilePhoto.scss';

const ProfilePhoto = ({photo, firstName, lastName}) => {
	return <div className="profile-photo" style={{
		backgroundImage: photo ?
			`url(${AppConfig.apiEntryPoint}${photo.content_uri})` : null
	}}>
		{
			!photo ?
				`${firstName[0]}${lastName[0]}` : null
		}
	</div>;
};

export default ProfilePhoto;