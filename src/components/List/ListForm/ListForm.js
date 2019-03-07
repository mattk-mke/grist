import React, { Component } from 'react';
import axios from '../../../axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ListForm extends Component {
	state = {
		form: {
			title: '',
			isPublic: false
		},
		created: false,
		newId: null
	}

	inputChangeHandler = (e) => {
		this.setState({form: {
			...this.state.form,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}
		});
	}

	formSubmitHandler = (e) => {
		e.preventDefault();
		axios.post('/lists/create', this.state.form, {
			headers: {
				"x-auth-token": this.props.token
			}
		})
		.then( res => {
			this.setState({created: true, newId: res.data.id});
		})
		
	}


	render() {
		let content = (
			<form onSubmit={this.formSubmitHandler}>
				<div>
					<label htmlFor="title">List Title</label>
					<input type="text" name="title" value={this.state.title} onChange={(e) => this.inputChangeHandler(e)} />
				</div>
				<div>
					<label htmlFor="isPublic">Make public?</label>
					<input type="checkbox" name="isPublic" checked={this.state.isPublic} onChange={(e) => this.inputChangeHandler(e)} />
				</div>
				<input type="submit" disabled={this.state.form.title.length < 1} />
			</form>
		);
		
		if (this.state.created) {
			content = <Redirect to={`/list/${this.state.newId}`}/>
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
		token: state.token
	}
}

export default connect(mapStateToProps)(ListForm);