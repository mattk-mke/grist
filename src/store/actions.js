import * as actionTypes from './actionTypes';
import axios from '../axios';

export const signInStart = () => {
	return {
		type: actionTypes.SIGN_IN_START,
	};
};

export const signInEnd = () => {
	return {
		type: actionTypes.SIGN_IN_END,
	};
};

export const signInSuccess = (profile) => {
	return {
		type: actionTypes.SIGN_IN_SUCCESS,
		profile: profile
	};
};

export const signInFail = (err) => {
	return {
		type: actionTypes.SIGN_IN_FAIL,
		error: err
	};
};

export const signIn = (token) => {
	return dispatch => {
		dispatch(signInStart());
		axios.post('/auth/google', {access_token: token}, { headers: { 
			"access_token": token
		} })
		.then( res => {
			const token = res.headers['x-auth-token'];
			if (token) {
				let expiresIn = new Date(); // Now
				expiresIn.setDate(expiresIn.getDate() + 15);
				dispatch(setToken(token));
				window.localStorage.setItem('jwt', JSON.stringify({token: res.data.token, expiresIn})); // save token to local storage
				dispatch(signInSuccess(res.data));
			} else {
				dispatch(signInFail(res.status));
			}
			dispatch(signInEnd());
		})
	.catch( err => {
			dispatch(signInFail(err));
			dispatch(signInEnd());
		});
	}
}

export const setToken = (token) => {
	return {
		type: actionTypes.SET_TOKEN,
		token: token
	};
};

export const signOut = () => {
	window.localStorage.removeItem('jwt'); // remove token from local storage
	return {
		type: actionTypes.SIGN_OUT
	};
};