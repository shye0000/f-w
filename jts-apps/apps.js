import React from 'react';
import IconSvg from 'wbc-components/lib/IconSvg';
import scafSvg from './icons/scaf.svg';
import agcSvg from './icons/agc.svg';
import dedicaceSvg from './icons/dedicace.svg';
import fondationsSvg from './icons/fondations.svg';
import gesprogSvg from './icons/gesprog.svg';
import rhSvg from './icons/rh.svg';

const iconSize = 36;

const apps = {
	scaf: {
		'name': 'SCAF',
		'color': '#4250A2',
		'icon': <IconSvg svg={scafSvg} size={iconSize} />,
		'id': 1,
		'position': 2
	},
	gesprog: {
		'name': 'GESPROG',
		'color': '#D24827',
		'icon': <IconSvg svg={gesprogSvg} size={iconSize} />,
		'id': 2,
		'position': 1
	},
	dedication: {
		'name': 'DEDICACES',
		'color': '#803A7B',
		'icon': <IconSvg svg={dedicaceSvg} size={iconSize} />,
		'id': 3,
		'position': 5,
	},
	agc: {
		'name': 'AGC',
		'color': '#0B6333',
		'icon': <IconSvg svg={agcSvg} size={iconSize} />,
		'id': 5,
		'position': 3
	},
	rh: {
		'name': 'RH',
		'frontName': 'Recrutement',
		'color': '#008272',
		'icon': <IconSvg svg={rhSvg} size={iconSize} />,
		'id': 4,
		'position': 4
	},
	fondations: {
		'name': 'FONDATIONS',
		'frontName': undefined,
		'color': '#751265',
		'icon': <IconSvg svg={fondationsSvg} size={iconSize} />,
		'id': 6,
		'position': 6
	}
};

export default apps;