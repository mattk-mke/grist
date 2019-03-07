import React, { Component } from 'react';
import axios from '../../axios';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';

import Spinner from '../UI/Spinner/Spinner';
import ListItem from './ListItem/ListItem';
import ListItemForm from './ListItem/ListItemForm/ListItemForm';

class List extends Component {
	state = {
		list: null,
		error: null,
		isAuthed: false,
		loading: true,
		editing: null
	}

	getListData() {
		if (!this.props.loading) {
			axios.get('/lists', {
				params: {
					id: this.props.match.params.id
				},
				headers: {
					"x-auth-token": this.props.token
				}
			})
			.then( res => {
				this.setState({list: res.data, loading: false, error: null});
			})
			.catch( err => {
				this.setState({error: err, loading: false});
			});
		}
	}

	editItemToggle = (id) => {
		this.setState({editing: id})
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.token && !prevState.isAuthed) {
			return {
				isAuthed: true
			}
		}
		return null;
	}

	componentDidMount() {
		this.getListData();
		const pusher = new Pusher('594af6570a657db2da21', {
			cluster: 'us2',
			encrypted: true
		});
		const channel = pusher.subscribe('list');
		channel.bind('item', data => {
			console.log('[pusher data]', data);
			this.getListData();
		});
	}

	componentDidUpdate() {
		if (this.state.isAuthed && !this.state.list) {
			this.getListData();
		}
	}

	render() {
		let content = <Spinner />;
		if (!this.state.loading && this.state.list) {
			content = (
				<div className="container box">
					<h1 className="title">{this.state.list.title}</h1>
					<div className="container">
					{this.state.list.listItems.map( listItem => (
						<ListItem key={listItem.id}
							listItem={listItem}
							token={this.props.token}
							getListData={this.getListData}
							editItem={this.editItemToggle}
							editing={this.state.editing === listItem.id} />
						))}
						{this.props.isAuthenticated ? <ListItemForm listId={this.state.list.id}
							reload={this.getListData}
							token={this.props.token} /> : null }
					</div>
				</div>
			);
		}
		return (
			<div className="section">
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		loading: state.loading,
		isAuthenticated: state.isAuthenticated
	}
}

export default connect(mapStateToProps)(List);