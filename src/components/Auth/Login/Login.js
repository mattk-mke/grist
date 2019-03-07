import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect, withRouter } from 'react-router-dom';

class Login extends Component {

	googleResponse = (res) => {
		this.props.signIn(res.accessToken);
	};

	onFailure = (error) => {
		alert("Login failed!");
	}

	render() {
		let content = <Spinner />;
		if (this.props.token) {
			content = <Redirect to="/" />;
		}
		if (!this.props.loading) {
			content = (
				<GoogleLogin
					clientId="632347726974-7i4huihhgbe271hql545uajf2jukag4o.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={this.googleResponse}
					onFailure={this.onFailure}
				/>
			);
		}
		return (
			<div>
				{content}
			</div>
		);
	}
}

	const mapStateToProps = (state) => {
		return {
			token: state.token,
			loading: state.loading
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			signIn: (token) => dispatch(actions.signIn(token))
		}
	}

	export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));