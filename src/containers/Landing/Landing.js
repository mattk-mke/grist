import React, { Component } from 'react';
import { connect } from 'react-redux';

import Lists from '../Lists/Lists';
import ListForm from '../../components/List/ListForm/ListForm';

class Landing extends Component {

	
	render() {
		let content = (<>
			<h2>Shopping made</h2>
			<h2>simple!</h2>
		</>);
		if (this.props.isAuthenticated) {
			content = (<>
					<div>
						<Lists listType="user" header="My Lists" />
						<Lists listType="public" header="Public Lists"/>
					</div>
					<div>
						<ListForm />
					</div>
			</>);
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

export default connect(mapStateToProps)(Landing);