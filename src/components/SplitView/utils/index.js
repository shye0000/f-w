import dot from 'dot-object';

const hasStorage = (typeof(localStorage) !== 'undefined');

const KEY_PREFIX = 'NAVIGATION_USER';

export const IsJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const decode = (str) => {
	let result;
	try {
		result = atob(str);
	} catch (e) {
		return null;
	}
	return result;
};

export const encode = (str) => {
	let result;
	try {
		result = btoa(str);
	} catch (e) {
		return null;
	}
	return result;
};

export const getUrlParams = (search) => {
	let hashes = search.slice(search.indexOf('?') + 1).split('&');
	hashes = hashes.reduce((params, hash) => {
		let [key, val] = hash.split('=');
		return Object.assign(params, {[key]: decodeURIComponent(val)});
	}, {});
	return dot.object(hashes);
};

export const saveUserNavigationInLocalStorage = (params, key) => {
	if (hasStorage) {
		localStorage.setItem(`${KEY_PREFIX}_${key}`, params);
	}
};

export const getUserNavigationInLocalStorage = (key) => {
	if (hasStorage) {
		const params = localStorage.getItem(`${KEY_PREFIX}_${key}`);
		if (params) {
			return params;
		}
	}
};

export const saveUserNavigationInUrl = (params, history, location) => {
	history.push({
		pathname: location.pathname,
		search: `?${KEY_PREFIX}=${JSON.stringify(params)}`
	});
};

export const getUserNavigationInUrl = (location) => {
	const urlParams = getUrlParams(location.search);
	return urlParams[KEY_PREFIX];
};