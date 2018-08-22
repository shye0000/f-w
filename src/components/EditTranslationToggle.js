import React from 'react';
import {connect} from 'react-redux';
import Button from 'antd/lib/button';
import Tooltip from 'antd/lib/tooltip';
import './EditTranslationToggle.scss';
import IconSvg from 'wbc-components/lib/IconSvg';
import translateSvg from '../../icons/translate.svg';
import classNames from 'classnames';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import {Trans} from 'lingui-react';
import {actions} from 'wbc-components/lib/Translations';

const mapStateToProps = (state) => {
	return {
		editTranslationsInlineActive: state.trans.activeEditTranslationInline
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleToggleEditTranslations: (activeEditTranslationInline) => {
			dispatch(actions.toggleEditTranslationInline(activeEditTranslationInline));
		}
	};
};

class EditTranslationToggle extends React.Component {

	toggleEditTranslationsInline = () => {
		this.props.handleToggleEditTranslations(!this.props.editTranslationsInlineActive);
	};

	render() {
		return <div className="edit-translation-toggle">
			<Tooltip
				title={<EditableTransWrapper><Trans>Inline translation modification</Trans></EditableTransWrapper>}
				placement="bottomRight" arrowPointAtCenter
			>
				<Button
					className={classNames({'edit-translation-active': this.props.editTranslationsInlineActive})}
					onClick={this.toggleEditTranslationsInline} size="small"
				>
					<IconSvg className="translation-icon" svg={translateSvg} size={16} />
				</Button>
			</Tooltip>
		</div>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTranslationToggle);
