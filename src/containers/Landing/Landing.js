import React, { Component } from 'react';
import { connect } from 'react-redux';

import Lists from '../Lists/Lists';
import ListForm from '../../components/List/ListForm/ListForm';

class Landing extends Component {

	
	render() {
		let content = (<div>
			<div className="hero is-dark">
				<div className="hero-body">
					<h1 className="title is-italic is-rounded">Shared shopping made simple!</h1>
				</div>
			</div>
			<div className="section columns is-centered">
				<Lists listType="public" header="Public Lists"/>
			</div>
		</div>);
		if (this.props.isAuthenticated) {
			content = (<div className="section">
					<div className="columns">
						<Lists listType="user" header="My Lists" />
						<Lists listType="public" header="Public Lists"/>
					</div>
					<div className="container">
						<ListForm />
					</div>
			</div>);
		}

		return (
			<>
				{content}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.isAuthenticated
	}
}

export default connect(mapStateToProps)(Landing);