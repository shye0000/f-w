import React from 'react';
import moment from 'moment';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Popover from 'antd/lib/popover';
import DateTimeInputMask from '../DateTimeInputMask';
import DayPicker from 'react-day-picker';
import {connect} from 'react-redux';
import MomentLocaleUtils from 'react-day-picker/moment';
import {withI18n} from 'lingui-react';
import 'react-day-picker/lib/style.css';
import './DatePicker.scss';

const mapStateToProps = (state) => {
	return {
		language: state.trans.language,
	};
};

class DatePicker extends React.Component {

	state = {pickerVisible: false}


	onDayClick = (clickedDate) => {
		let newFieldValue;
		const {form, id, time, i18n} = this.props;
		const oldFieldValue = form.getFieldValue(id);
		const localeDate = moment(clickedDate);
		const dateFormat = i18n.t`DATE_FORMAT`;
		const dateString = localeDate.format(dateFormat);
		if (time) {
			newFieldValue = moment(dateString, dateFormat, true);
		} else {
			newFieldValue = moment.utc(dateString, dateFormat, true);
		}
		if (oldFieldValue && time) {
			newFieldValue.hours(oldFieldValue.hours());
			newFieldValue.minutes(oldFieldValue.minutes());
		}
		form.setFieldsValue({[id]: newFieldValue});
		this.setState({pickerVisible: false});
	}

	render() {
		const InputGroup = Input.Group;
		const {
			size, disabled, placeholder, form, id, value,
			time, language, showWeekNumbers, className,
			autoFocus, style
		} = this.props;

		const locale = language.split('_')[0];

		const {pickerVisible} = this.state;
		return <div className={`date-picker ${className}`}>
			<InputGroup className="date-picker-input-group" compact>
				<DateTimeInputMask
					disabled={disabled}
					placeholder={placeholder}
					value={value}
					size={size}
					form={form}
					id={id}
					date
					time={time}
					autoFocus={autoFocus}
					style={style}
				/>
				<Popover
					placement="bottomRight"
					arrowPointAtCenter
					visible={pickerVisible}
					onVisibleChange={(visible) => this.setState({pickerVisible: visible})}
					overlayClassName="date-picker-popover"
					trigger="click"
					content={
						<DayPicker
							key={value ? value.valueOf() : 'undefined'}
							firstDayOfWeek={1}
							localeUtils={MomentLocaleUtils}
							locale={locale}
							showOutsideDays
							fixedWeeks
							showWeekNumbers={showWeekNumbers}
							initialMonth={value ? value._d : undefined}
							selectedDays={value ? value._d : undefined}
							onDayClick={(date) => this.onDayClick(date)}
						/>
					}
				>
					<Button
						disabled={disabled}
						size={size}
						icon="calendar"
						onClick={() => this.setState({pickerVisible: true})} />
				</Popover>
			</InputGroup>
		</div>;
	}
}

export default connect(mapStateToProps)(withI18n()(DatePicker));
