import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Landing extends Component {

	
	render() {
		return (
			<div>
				<h2>Shopping made</h2>
				<h2>simple!</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setToken: (token) => dispatch(actions.setToken(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);