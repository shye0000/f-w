import React from 'react';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './ClickListElemTip.scss';

const ClickListElemTip = () => {
	return <div className="click-list-elem-tip">
		<div className="please-search-msg">
			<EditableTransWrapper>
				<Trans>Cliquez sur un élément dans la liste pour visualiser les détails</Trans>
			</EditableTransWrapper>
		</div>
	</div>;
};

export default ClickListElemTip;