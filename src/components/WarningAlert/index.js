import React from 'react';
import Alert from 'antd/lib/alert';
import './WarningAlert.scss';

const WarningAlert = ({iconType, message}) => {
	return <Alert
		className="warning-alert"
		iconType={iconType || 'warning'}
		message={message}
		type="warning"
		showIcon
	/>;
};

export default WarningAlert;