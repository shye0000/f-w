import React from 'react';
import IconSvg from 'wbc-components/lib/IconSvg';
import searchSvg from '../../../../icons/search.svg';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './SplitViewEmpty.scss';

const SplitViewEmpty = () => {
	return <div className="split-view-empty">
		<IconSvg svg={searchSvg} className="empty-icon" size={60} />
		<div className="empty-msg">
			<EditableTransWrapper>
				<Trans>Aucun résultat</Trans>
			</EditableTransWrapper>
		</div>
	</div>;
};

export default SplitViewEmpty;