import React, { Component } from 'react';
import axios from '../../../../axios';

class ListItemForm extends Component {
	state = {
		form: {
			title: '',
			priority: 'medium'
		},
		error: null
	};

	inputChangeHandler = (e) => {
		this.setState({form: {
			...this.state.form,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}
		});
	}

	submitCreateHandler = (e) => {
		e.preventDefault();
		axios.post('/listitems/create', {
			...this.state.form, listId: this.props.listId
		}, {
			headers: {
				"x-auth-token": this.props.token
			}
		})
		.then( res => {
			console.log(res.data);
			this.setState({form: {title: '', priority: "medium"} });
		})
		.catch( err => {
			this.setState({error: err});
		})
	}

	submitUpdateHandler = (e) => {
		e.preventDefault();
		axios.post('/listitems/update', {
			...this.state.form, id: this.props.item.id
		}, {
			headers: {
				"x-auth-token": this.props.token
			}
		})
		.then( res => {
			console.log(res.data);
			this.props.editToggle();
			this.setState({form: {title: '', priority: "medium"} });
		})
		.catch( err => {
			this.setState({error: err});
		})
	}

	componentDidMount() {
		if (this.props.inline) {
			this.setState({form: {
				title: this.props.item.title,
				priority: this.props.item.priority
			}})
		}
	}


	render() {
		return (
			<div>
				<h3 className="subtitle has-text-weight-bold">{this.props.inline ? null : "Add Item"}</h3>
				<form className="columns is-centered" onSubmit={this.props.inline ? this.submitUpdateHandler : this.submitCreateHandler}>
					<div className="field has-addons">
						<div className="control">
							<input className="input is-small" type="text" name="title"
								placeholder="Item title"
								value={this.state.form.title}
								onChange={this.inputChangeHandler} />
						</div>
						<label className="control">
							Priority:
							<div className="select is-small">
								<select name="priority" value={this.state.form.priority} onChange={this.inputChangeHandler}>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
							</div>
						</label>
					</div>
					<div className="field has-addons">
						{this.props.inline ? <button className="control button is-danger is-small" onClick={this.props.editToggle}>Cancel</button> : null }
						<input className="control button is-success is-small" type="submit" disabled={this.state.form.title.length < 1} />
					</div>
				</form>
			</div>
		);
	}
}

export default ListItemForm;