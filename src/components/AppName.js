import React from 'react';
import {Link} from 'react-router-dom';
import cheet from '../../node_modules/cheet.js/cheet';
import classNames from 'classnames';
import WordShuffler from './WordShuffler';
import IconSvg from 'wbc-components/lib/IconSvg';
import fondationsSvg from '../../icons/fondations.svg';
import './AppName.scss';

class AppName extends React.Component {

	state = { jts: 0 }

	cheet = 'j t s j t s j t s'

	componentDidMount() {
		let jts;
		cheet(this.cheet, {
			next: (str, key, num) => {
				clearTimeout(jts);
				const count = num + 1;
				if (count === 3) {
					this.setState({
						jts: 1
					});
				} else if (count === 6) {
					this.setState({
						jts: 2
					});
				}
			},
			fail: () => {
				this.setState({
					jts: 0
				});
			},
			done: () => {
				this.setState({
					jts: 3
				}, () => {
					new WordShuffler(this.shuffler, {
						textColor : '#fff',
						timeOffset : 4,
						mixCapital : true,
						mixSpecialCharacters : true
					});
					jts = setTimeout(() => {
						this.setState({jts: 0});
					}, 6000);
				});
			}
		});
		cheet('esc', {
			done: () => {
				this.setState({
					jts: 0
				});
			}
		});
	}

	componentWillUnmount() {
		cheet.disable('esc');
		cheet.disable(this.cheet);
	}

	render() {
		const {jts} = this.state;

		const shuffler = <span key="shuffler" ref={shuffler => this.shuffler = shuffler} className="shuffler">
			Made by WEBCENTRIC
		</span>;
		const appName = <span key="name" className="name">Fondations</span>;
		const appIcon = <IconSvg key="app-icon" className="app-icon" svg={fondationsSvg} size={20} />;

		return <Link
			to="/"
			className={classNames('app-name', {
				'shake': jts === 1,
				'rubberBand': jts === 2,
				'with-shuffler': jts === 3
			})}
		>
			{
				jts === 3 ?
					[appIcon, appName, shuffler]
					:
					[appIcon, appName]
			}
		</Link>;
	}
}

export default AppName;
