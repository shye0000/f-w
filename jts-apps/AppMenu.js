import React from 'react';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
import IconSvg from 'wbc-components/lib/IconSvg';
import appMenuSvg from '../icons/appmenu.svg';
import jtsApps from './apps';
import classNames from 'classnames';
import './AppMenu.scss';

const AppMenuBody = ({apps}) => {
	return <div className="app-menu-content">
		{
			Object.keys(apps)
				.filter(ref => ref !== AppConfig.appRef)
				.sort((ref1, ref2) => {
					const app1 = apps[ref1];
					const app2 = apps[ref2];
					return app1.position - app2.position;
				})
				.map(ref => {
					const app = apps[ref];
					const {id, name, color, url, disabled, icon} = app;
					return <a
						key={id}
						href={url}
						className={classNames('app-menu-item', {
							disabled: disabled
						})}
						target="_blank"
						rel="noopener noreferrer"
						style={{background: color}}
						onClick={ev => disabled && ev.preventDefault()}
					>
						<div className="item-inner">
							<div className="app-icon">{icon}</div>
							{name}
						</div>
					</a>;
				})
		}
	</div>;
};

const AppMenu = () => {
	let apps = {};
	for (let key in AppConfig.jtsApps) {
		apps[key] = {
			...jtsApps[key],
			...AppConfig.jtsApps[key]
		};
	}
	return <Popover
		arrowPointAtCenter
		placement="bottomLeft"
		content={<AppMenuBody apps={apps}/>}
		trigger="click"
	>
		<Tooltip
			arrowPointAtCenter
			placement="right"
			title={
				<EditableTransWrapper><Trans>{'Changer d\'application'}</Trans></EditableTransWrapper>
			}
		>
			<div className="app-menu">
				<IconSvg svg={appMenuSvg} size={23} />
			</div>
		</Tooltip>
	</Popover>;
};

export default AppMenu;
