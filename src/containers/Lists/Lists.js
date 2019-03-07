import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';

import ListsItem from '../../components/List/ListsItem/ListsItem';
import Spinner from '../../components/UI/Spinner/Spinner';

class Lists extends Component {
	state = {
		lists: [],
		loading: true,
		error: null
	}

	getListsData() {
		axios.get(`/lists/${this.props.listType}`, {
			headers: {
				"x-auth-token": this.props.token
			}
		})
		.then( res => {
			this.setState({lists: res.data, loading: false, error: null});
		})
		.catch( err => {
			this.setState({error: err, loading: false});
		});
	}

	deleteListHandler = (id) => {
		axios.post(`lists/destroy`, { id }, {
			headers: {
				"x-auth-token": this.props.token
			}
		});
	}

	componentDidMount() {
		this.getListsData();
		const pusher = new Pusher('594af6570a657db2da21', {
			cluster: 'us2',
			encrypted: true
		});
		const channel = pusher.subscribe('list');
		channel.bind('lists', data => {
			console.log('[pusher data]', data);
			this.getListsData();
		});
	}

	render() {
		let content = <Spinner />;
		if (!this.state.loading) {
			content = (
			<div className="column is-half is-max-height">
				<div className="box">
					<h1 className="title">{this.props.header}</h1>
					{this.state.lists.map( list => (
						<ListsItem key={list.id}
							list={list}
							listType={this.props.listType}
							userId={this.props.userId}
							deleteList={this.deleteListHandler} />
					))}
				</div>
			</div>
			);
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
		token: state.token,
		userId: state.profile ? state.profile.id : 0
	}
}

export default connect(mapStateToProps)(Lists);