import EntityReducersGenerator from 'wbc-components/lib/utils/Redux/EntityReducersGenerator';
import EntityActionsGenerator from 'wbc-components/lib/utils/Redux/EntityActionsGenerator';
import jsonStringifyPreserveUndefined from '../utils/jsonStringifyPreserveUndefined';
import apiClient from '../../apiClient';

export const RESOURCE = 'users';

export const ACCOUNTS_FETCH_TABLE_IDS = 'ACCOUNTS_FETCH_TABLE_IDS';

export const ACCOUNTS_FETCH_BY_IDS = 'ACCOUNTS_FETCH_BY_IDS';

export const FETCHING_IDS_TOGGLE = 'FETCHING_IDS_TOGGLE';

export const FETCHING_BY_IDS_TOGGLE = 'FETCHING_BY_IDS_TOGGLE';

export const CLEAR_IDS = 'CLEAR_IDS';

export const ACCOUNTS_FETCH_USER = 'ACCOUNTS_FETCH_USER';

export const FETCH_USER_LANGUAGES = 'FETCH_USER_LANGUAGES';

export const FETCH_USER_HISTORIES = 'FETCH_USER_HISTORIES';

export const FETCH_USER_PROFILES = 'FETCH_USER_PROFILES';

export const FETCH_USER_FUNCTIONS = 'FETCH_USER_FUNCTIONS';

export const MODIFY_USER = 'MODIFY_USER';


const otherActions = {
	[FETCHING_IDS_TOGGLE]: {
		action (fetchingIds = false) {
			return (dispatch) => {
				dispatch({
					type: FETCHING_IDS_TOGGLE,
					fetchingIds
				});
			};
		},
		reducer (action, state) {
			return {
				...state,
				fetchingIds: action.fetchingIds
			};
		}
	},
	[FETCHING_BY_IDS_TOGGLE]: {
		action (fetchingByIds = false) {
			return (dispatch) => {
				dispatch({
					type: FETCHING_BY_IDS_TOGGLE,
					fetchingByIds
				});
			};
		},
		reducer (action, state) {
			return {
				...state,
				fetchingByIds: action.fetchingByIds
			};
		}
	},
	[CLEAR_IDS]: {
		action () {
			return (dispatch) => {
				dispatch({
					type: CLEAR_IDS
				});
			};
		},
		reducer (action, state) {
			return {
				...state,
				fetchingIds: false,
				fetchedIds: false,
				ids: null
			};
		}
	},
	[FETCH_USER_LANGUAGES]: {
		action (userId) {
			return (dispatch) => {
				dispatch({
					type: FETCH_USER_LANGUAGES,
					fetchingUserLanguages: true
				});
				return apiClient.fetch('user_languages', {
					params: {
						user: userId,
						pagination: false,
					}
				}).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: FETCH_USER_LANGUAGES,
								fetchingUserLanguages: false,
								fetchedUserLanguages: true,
								userLanguages: result.json['hydra:member']
							});
						} else {
							dispatch({
								type: FETCH_USER_LANGUAGES,
								fetchingUserLanguages: false,
								fetchedUserLanguages: true,
								userLanguages: null
							});
						}
					},
					() => {
						dispatch({
							type: FETCH_USER_LANGUAGES,
							fetchingUserLanguages: false,
							fetchedUserLanguages: true,
							userLanguages: null
						});
					}
				);
			};
		},
		reducer (action, state) {
			return {
				...state,
				userLanguages: action.userLanguages,
				fetchingUserLanguages: action.fetchingUserLanguages,
				fetchedUserLanguages: action.fetchedUserLanguages,
			};
		}
	},
	[FETCH_USER_PROFILES]: {
		action (userId) {
			return (dispatch) => {
				dispatch({
					type: FETCH_USER_PROFILES,
					fetchingUserProfiles: true
				});
				return apiClient.fetch('groups', {
					params: {
						user: userId,
						pagination: false,
					}
				}).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: FETCH_USER_PROFILES,
								fetchingUserProfiles: false,
								fetchedUserProfiles: true,
								userProfiles: result.json['hydra:member']
							});
						} else {
							dispatch({
								type: FETCH_USER_PROFILES,
								fetchingUserProfiles: false,
								fetchedUserProfiles: true,
								userProfiles: null
							});
						}
					},
					() => {
						dispatch({
							type: FETCH_USER_PROFILES,
							fetchingUserProfiles: false,
							fetchedUserProfiles: true,
							userProfiles: null
						});
					}
				);
			};
		},
		reducer (action, state) {
			return {
				...state,
				userProfiles: action.userProfiles,
				fetchingUserProfiles: action.fetchingUserProfiles,
				fetchedUserProfiles: action.fetchedUserProfiles,
			};
		}
	},
	[FETCH_USER_HISTORIES]: {
		action (userId, itemsPerPage, page = 1) {
			return (dispatch) => {
				dispatch({
					type: FETCH_USER_HISTORIES,
					fetchingUserHistories: true
				});
				return apiClient.fetch('user_histories', {
					params: {
						user: userId,
						page,
						itemsPerPage,
						'order[createdAt]': 'DESC',
					}
				}).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: FETCH_USER_HISTORIES,
								fetchingUserHistories: false,
								fetchedUserHistories: true,
								userHistories: result.json
							});
						} else {
							dispatch({
								type: FETCH_USER_HISTORIES,
								fetchingUserHistories: false,
								fetchedUserHistories: true,
								userHistories: null
							});
						}
					},
					() => {
						dispatch({
							type: FETCH_USER_HISTORIES,
							fetchingUserHistories: false,
							fetchedUserHistories: true,
							userHistories: null
						});
					}
				);
			};
		},
		reducer (action, state) {
			return {
				...state,
				userHistories: action.userHistories === undefined ?
					state.userHistories : action.userHistories,
				fetchingUserHistories: action.fetchingUserHistories,
				fetchedUserHistories: action.fetchedUserHistories === undefined ?
					state.fetchedUserHistories : action.fetchedUserHistories,
			};
		}
	},
	[FETCH_USER_FUNCTIONS]: {
		action (userId, itemsPerPage, page = 1) {
			return (dispatch) => {
				dispatch({
					type: FETCH_USER_FUNCTIONS,
					fetchingUserFunctions: true
				});
				return apiClient.fetch('user_group_entities', {
					params: {
						user: userId,
						page,
						itemsPerPage,
					}
				}).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: FETCH_USER_FUNCTIONS,
								fetchingUserFunctions: false,
								fetchedUserFunctions: true,
								userFunctions: result.json
							});
						} else {
							dispatch({
								type: FETCH_USER_FUNCTIONS,
								fetchingUserFunctions: false,
								fetchedUserFunctions: true,
								userFunctions: null
							});
						}
					},
					() => {
						dispatch({
							type: FETCH_USER_FUNCTIONS,
							fetchingUserFunctions: false,
							fetchedUserFunctions: true,
							userFunctions: null
						});
					}
				);
			};
		},
		reducer (action, state) {
			return {
				...state,
				userFunctions: action.userFunctions === undefined ?
					state.userFunctions : action.userFunctions,
				fetchingUserFunctions: action.fetchingUserFunctions,
				fetchedUserFunctions: action.fetchedUserFunctions === undefined ?
					state.fetchedUserFunctions : action.fetchedUserFunctions,
			};
		}
	},
	[ACCOUNTS_FETCH_USER]: {
		action (id) {
			return (dispatch) => {
				dispatch({
					type: ACCOUNTS_FETCH_USER,
					fetchingUser: true
				});
				return apiClient.fetch(`${RESOURCE}/${id}`).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: ACCOUNTS_FETCH_USER,
								fetchingUser: false,
								fetchedUser: true,
								user: result.json
							});
						} else {
							dispatch({
								type: ACCOUNTS_FETCH_USER,
								fetchingUser: false,
								fetchedUser: true,
								user: null
							});
						}
					},
					() => {
						dispatch({
							type: ACCOUNTS_FETCH_USER,
							fetchingUser: false,
							fetchedUser: true,
							user: null
						});
					}
				);
			};
		},
		reducer (action, state) {

			let listElems;
			const {splitViewListElements} = state;

			if (splitViewListElements && action.user) {
				listElems = splitViewListElements.map(elem => {
					if (elem.id === action.user.id) {
						return action.user;
					}
					return elem;
				});
			}

			return {
				...state,
				splitViewListElements: listElems ? listElems : splitViewListElements,
				user: action.user,
				fetchedUser: action.fetchedUser,
				fetchingUser: action.fetchingUser,
			};
		}
	},
	[ACCOUNTS_FETCH_TABLE_IDS]: {
		action (params) {
			return (dispatch) => {
				dispatch({
					type: FETCHING_IDS_TOGGLE,
					fetchingIds: true
				});
				return apiClient.fetch(RESOURCE + '/ids', {
					params: {
						...params,
						page: 1,
						itemsPerPage: 1000
					}
				}).then(
					(result) => {
						if (result.status === 200) {
							dispatch({
								type: ACCOUNTS_FETCH_TABLE_IDS,
								fetchingIds: false,
								fetchedIds: true,
								ids: result.json
							});
						} else {
							dispatch({
								type: ACCOUNTS_FETCH_TABLE_IDS,
								fetchingIds: false,
								fetchedIds: true,
								ids: null
							});
						}
					},
					() => {
						dispatch({
							type: ACCOUNTS_FETCH_TABLE_IDS,
							fetchingIds: false,
							fetchedIds: true,
							ids: null
						});
					}
				);
			};
		},
		reducer (action, state) {
			return {
				...state,
				ids: action.ids,
				fetchedIds: action.fetchedIds,
				fetchingIds: action.fetchingIds,
			};
		}
	},
	[ACCOUNTS_FETCH_BY_IDS]: {
		action (params = {}) {
			return function (dispatch) {
				if (params.id && params.id.length) {
					dispatch({
						type: FETCHING_BY_IDS_TOGGLE,
						fetchingByIds: true
					});
					return apiClient.fetch(RESOURCE, {
						params: {
							...params,
							pagination: false,
						}
					}).then(
						(result) => {
							if (result.status === 200) {
								dispatch({
									type: ACCOUNTS_FETCH_BY_IDS,
									splitViewListElements: result.json['hydra:member'],
									fetchingByIds: false
								});
							} else {
								dispatch({
									type: ACCOUNTS_FETCH_BY_IDS,
									splitViewListElements: null,
									fetchingByIds: false
								});
							}
						},
						() => {
							dispatch({
								type: ACCOUNTS_FETCH_BY_IDS,
								splitViewListElements: null,
								fetchingByIds: false
							});
						}
					);
				}
			};
		},
		reducer (action, state) {
			return {
				...state,
				splitViewListElements: action.splitViewListElements,
				fetchingByIds: action.fetchingByIds
			};
		}
	},
	[MODIFY_USER]: {
		action (userUri, params = {}) {
			return function (dispatch) {
				dispatch({
					type: MODIFY_USER,
					modifyingUser: true
				});
				return new Promise((resolve, reject) => {
					apiClient.fetch(userUri, {
						method: 'PUT',
						body: jsonStringifyPreserveUndefined(params)
					}).then(
						(result) => {
							if (result.status === 200) {
								dispatch({
									type: MODIFY_USER,
									modifiedUser: result.json,
									modifyingUser: false
								});
								resolve(result);
							} else {
								dispatch({
									type: MODIFY_USER,
									modifiedUser: null,
									modifyingUser: false
								});
								reject();
							}
						},
						(error) => {
							dispatch({
								type: MODIFY_USER,
								modifiedUser: null,
								modifyingUser: false
							});
							reject(error);
						}
					);
				});
			};
		},
		reducer (action, state) {
			let user, listElems;
			const {splitViewListElements} = state;
			if (action.modifiedUser && state.user && state.user.id === action.modifiedUser.id) {
				user = action.modifiedUser;
			}

			if (splitViewListElements && action.modifiedUser) {
				listElems = splitViewListElements.map(elem => {
					if (elem.id === action.modifiedUser.id) {
						return action.modifiedUser;
					}
					return elem;
				});
			}

			return {
				...state,
				splitViewListElements: listElems ? listElems : splitViewListElements,
				user: user ? user : state.user,
				modifiedUser: action.modifiedUser,
				modifyingUser: action.modifyingUser
			};
		}
	}
};

export const actions = EntityActionsGenerator({
	resource: RESOURCE,
	otherActions: otherActions
});

const reducers = EntityReducersGenerator(actions);

export default reducers;
