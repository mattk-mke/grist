import React from 'react';
import googleSignin from '../../../assets/googleSignin.png';

const login = (props) => (
	<div>
		<a href="/auth/google">
			<img src={googleSignin} alt="Sign in with google" width={props.width} />
		</a>
	</div>
);

export default login;