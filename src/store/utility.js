export const updateObject = (oldObject, values) => {
	return {
		...oldObject,
		...values
	}
}

export const clearObject = (oldObject, child) => {
	let obj = {...oldObject[child]}
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			obj[key] = null;
		}
	}
	return {
		...oldObject,
		[child]: obj
	};
};

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		const deSerializedState = JSON.parse(serializedState);
		if (Date.now() > Date.parse(deSerializedState.auth.expiresIn)) {
			return {...deSerializedState, auth: {...deSerializedState.auth, isAuthenticated: false}};
		}
		return deSerializedState;
	} catch (err) {
			return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// Ignore errors
	}
};