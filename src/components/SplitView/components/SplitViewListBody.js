import React from 'react';
import {Trans} from 'lingui-react';
import EditableTransWrapper from 'wbc-components/lib/Translations/components/EditableTransWrapper';
import classNames from 'classnames';
import Checkbox from 'antd/lib/checkbox';
import './SplitViewListBody.scss';

class SplitViewListBody extends React.Component {

	componentDidMount = () => {
		this.scrollToCurrentElem();
	}

	componentDidUpdate = (prevProps) => {
		const {currentElem} = this.props;
		if (prevProps.currentElem !== currentElem) {
			this.scrollToCurrentElem();
		}
	}

	scrollToCurrentElem = () => {
		const {currentElem} = this.props;
		const currentElemComp = document.getElementsByClassName('current-elem')[0];
		if (currentElem && currentElemComp) {
			const listScrollingBody = currentElemComp.parentElement;
			const bodyOffsetHeight = listScrollingBody.offsetHeight;
			const bodyScrollTop = listScrollingBody.scrollTop;
			const bodyOffsetTop = this.getElementOffset(listScrollingBody).top;
			const currentElemOffsetTop = this.getElementOffset(currentElemComp).top;
			const currentElemOffsetHeight = currentElemComp.offsetHeight;
			if (currentElemOffsetTop < bodyOffsetTop + bodyScrollTop) {
				listScrollingBody.scrollTop = currentElemOffsetTop - bodyOffsetTop;
			}
			if (bodyOffsetTop + bodyOffsetHeight < currentElemOffsetTop + currentElemOffsetHeight - bodyScrollTop) {
				listScrollingBody.scrollTop =
					currentElemOffsetTop + currentElemOffsetHeight - bodyOffsetTop - bodyOffsetHeight;
			}
		}
	}

	getElementOffset = (el) => {
		let top = 0;
		let left = 0;
		let element = el;
		// Loop through the DOM tree
		// and add it's parent's offset to get page offset
		do {
			top += element.offsetTop || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return {
			top,
			left,
		};
	}

	render() {
		const {
			elems, currentElem, checkAll, listElemComp, checkedElems,
			listElemOnClickCallback, listElemOnCheckCallback
		} = this.props;

		return elems && elems.length ?
			elems.map(elem => {
				const {key} = elem;
				const find = checkedElems.find(el => el.key === key);
				const checked = checkAll || !!find;
				return <div
					key={key}
					className={classNames('list-elem-wrapper', {
						'current-elem': currentElem === key
					})}
					onClick={() => listElemOnClickCallback(key)}
				>
					<Checkbox
						checked={checked}
						className="list-elem-check"
						onClick={ev => {
							ev.stopPropagation();
							listElemOnCheckCallback(elem, ev.target.checked);
						}}
					/>
					{listElemComp(elem)}
				</div>;
			})
			:
			<div className="empty-tag">
				<EditableTransWrapper>
					<Trans>Aucun résultat</Trans>
				</EditableTransWrapper>
			</div>;
	}
}

export default SplitViewListBody;