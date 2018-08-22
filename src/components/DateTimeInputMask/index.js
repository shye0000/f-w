import React from 'react';
import InputMask from 'react-input-mask';
import moment from 'moment';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {withI18n} from 'lingui-react';
import './DateTimeInputMask.scss';

const mapStateToProps = (state) => {
	return {
		language: state.trans.language,
	};
};

class DateTimeInputMask extends React.Component {

	state={
		maskValue: this.props.initialValue || ''
	}

	inputOnChange = (ev) => {
		const {form, id, date, time} = this.props;
		this.setState({maskValue: ev.target.value});
		const format = this.getDateFormat(date, time);

		let inputValue;
		if (date && time) {
			inputValue = moment(ev.target.value, format, true);
		} else {
			inputValue = moment.utc(ev.target.value, format, true);
		}

		if (inputValue.isValid()) {
			form.setFieldsValue({[id]: inputValue});
			return true;
		} else {
			form.setFieldsValue({[id]: undefined});
			return false;
		}

	}

	inputOnBlur = (ev) => {
		const valid = this.inputOnChange(ev);
		if (!valid) {
			this.setState({maskValue: ''});
		}
	}

	getDateFormat = (date, time) => {
		const {i18n} = this.props;
		if (date && !time) {
			return i18n.t`DATE_FORMAT`;
		}
		if (date && time) {
			return i18n.t`DATE_TIME_FORMAT`;
		}
	}

	getInputMask = (date, time) => {
		const {i18n} = this.props;
		if (date && !time) {
			return i18n.t`DATE_INPUT_MASK`;
		}
		if (date && time) {
			return i18n.t`DATE_TIME_INPUT_MASK`;
		}
	}

	render() {
		const {maskValue} = this.state;
		const {size, disabled, placeholder, date, time, value, autoFocus, style} = this.props;
		const inputMask = this.getInputMask(date, time);
		const dateFormat = this.getDateFormat(date, time);
		return <InputMask
			value={(value ? moment(value).format(dateFormat) : '') || maskValue}
			placeholder={placeholder}
			className={classNames('ant-input input-mask', {
				'ant-input-lg': size === 'large',
				'ant-input-sm': size === 'small',
				'ant-input-disabled': disabled
			})}
			mask={inputMask}
			disabled = {disabled}
			onBlur={(ev) => this.inputOnBlur(ev)}
			onChange={(ev) => this.inputOnChange(ev)}
			autoFocus={autoFocus}
			style={style}
		/>;
	}
}

export default connect(mapStateToProps)(withI18n()(DateTimeInputMask));
