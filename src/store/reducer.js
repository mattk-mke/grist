import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
	token: null,
	profile: null,
	loading: false,
	error: null,
	isAuthenticated: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SIGN_IN_START:
			return updateObject(state, {loading: true});
		case actionTypes.SIGN_IN_END:
			return updateObject(state, {loading: false});
		case actionTypes.SIGN_IN_SUCCESS:
			return updateObject(state, {profile: action.profile, isAuthenticated: true});
		case actionTypes.SIGN_IN_FAIL:
			return updateObject(state, {error: action.error, isAuthenticated: false})
		case actionTypes.SET_TOKEN:
			return updateObject(state, {token: action.token})
		default:
			return state;
	}
}

export default reducer;