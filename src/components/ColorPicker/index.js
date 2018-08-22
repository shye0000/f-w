import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import { CirclePicker } from 'react-color';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import './ColorPicker.scss';

class ColorPicker extends React.Component {

	state = {
		displayColorPicker: false,
		color: this.props.color || '#fff'
	};

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });

	};

	handleChange = (color) => {
		this.setState({
			displayColorPicker: false,
			color: color.hex
		});
		this.props.form.setFieldsValue({
			[this.props.name]: color.hex,
		});
	}

	colors = [
		'#873800',
		'#D46B08',
		'#FB9637',
		'#FBAD15',
		'#71CD46',
		'#389E0E',
		'#237803',
		'#01474F',
		'#006D74',
		'#08979D',
		'#2EBCD0',
		'#009FE3',
		'#3473E2',
		'#003A8C',
		'#722ED1',
		'#9C27B0',
		'#7F1359',
		'#C51D7F',
	];

	render() {
		const popover = {
			position: 'absolute',
			zIndex: '2',
		};
		const cover = {
			position: 'fixed',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		};

		const {colors, size, placeholder} = this.props;
		const {color, displayColorPicker} = this.state;
		return (
			<div className="color-picker">
				<div className="color-picker-field">
					<label className="color-picker-color">
						<Input
							placeholder={placeholder} value={color === '#fff' ? null : color}
							readOnly={true} size={size} className="color-input"
							style={{background: color}} onClick={this.handleClick}/>
					</label>
					<Button size={size} onClick={this.handleClick}>
						<EditableTransWrapper><Trans>Choisir</Trans></EditableTransWrapper>
					</Button>
				</div>
				{ displayColorPicker ? <div style={ popover }>
					<div style={cover} onClick={this.handleClose}/>
					<CirclePicker
						circleSpacing={10}
						color={color}
						className="color-picker-popover"
						colors={colors || this.colors}
						onChangeComplete={this.handleChange}/>
				</div> : null }
			</div>
		);
	}

}
export default ColorPicker;