import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect, withRouter } from 'react-router-dom';

class Login extends Component {

	componentDidMount() {
		if (this.props.isAuthenticated) {
			this.props.signOut();
		}
	}

	render() {
		let content = "Logging out...";
		if (!this.props.isAuthenticated) {
			content = <Redirect to="/" />;
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
			isAuthenticated: state.isAuthenticated
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			signOut: () => dispatch(actions.signOut())
		}
	}

	export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));