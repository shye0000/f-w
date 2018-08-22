import React from 'react';
import Icon from 'antd/lib/icon';
import classNames from 'classnames';
import './Tag.scss';

const Tag = (props) => {
	const {label, error, warning} = props;
	let {checked} = props;
	if(error)
		checked = false;
	return <div className={classNames('tag', {checked: checked}, {error: (error || warning)})}>
		{	!warning ? (checked ? <Icon type="check" /> : <Icon type="close" />) : null}
		<span>{label}</span>
	</div>;
};
export default Tag;
