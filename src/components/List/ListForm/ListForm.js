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
			<div className="container">
				<h1 className="title">Create List</h1>
				<form onSubmit={this.formSubmitHandler}>
					<div className="field has-addons">
						<div className="control is-expanded">
							<input className="input" type="text" name="title" placeholder="List Title" value={this.state.title} onChange={(e) => this.inputChangeHandler(e)} />
						</div>
						<div className="control is-expanded button">
							<div className="control">
								<label className="checkbox label">
									<input type="checkbox" name="isPublic" checked={this.state.isPublic} onChange={(e) => this.inputChangeHandler(e)} />
									Make public?
								</label>
							</div>
							<div className="control">
							</div>
						</div>
					</div>
					<div className="form">
							<input className="control button is-dark" type="submit" disabled={this.state.form.title.length < 1} />
					</div>
				</form>
			</div>
		);
		
		if (this.state.created) {
			content = <Redirect to={`/list/${this.state.newId}`}/>
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
		token: state.token
	}
}

export default connect(mapStateToProps)(ListForm);