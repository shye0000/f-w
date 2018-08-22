import React from 'react';
import Button from 'antd/lib/button';
import IconSvg from 'wbc-components/lib/IconSvg';
import folderSvg from '../../../../icons/folder.svg';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './PleaseSearch.scss';

const PleaseSearch = ({showAllCallback}) => {
	return <div className="please-search">
		<IconSvg svg={folderSvg} className="please-search-icon" size={60} />
		<div className="please-search-msg">
			<EditableTransWrapper>
				<Trans>Veuillez sélectionner des filtres pour afficher la liste</Trans>
			</EditableTransWrapper>
		</div>
		<Button onClick={() => showAllCallback()}>
			<EditableTransWrapper>
				<Trans>Ou afficher tous les résultats</Trans>
			</EditableTransWrapper>
		</Button>
	</div>;
};

export default PleaseSearch;