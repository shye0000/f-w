import dot from 'dot-object';


const hasStorage = (typeof(localStorage) !== 'undefined');

export const getUrlParams = (search) => {
	let hashes = search.slice(search.indexOf('?') + 1).split('&');
	hashes = hashes.reduce((params, hash) => {
		let [key, val] = hash.split('=');
		return Object.assign(params, {[key]: decodeURIComponent(val)});
	}, {});
	return dot.object(hashes);
};

export const saveParamsInLocalStorage = (params, key) => {
	if (hasStorage) {
		localStorage.setItem(key || new Date().valueOf(), params);
	}
};

export const getParamsInLocalStorage = (key) => {
	if (hasStorage) {
		const params = localStorage.getItem(key);
		if (params) {
			return params;
		}
	}
};