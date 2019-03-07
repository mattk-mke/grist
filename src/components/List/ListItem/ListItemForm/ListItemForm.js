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

	formSubmitHandler = (e) => {
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


	render() {
		return (
			<div>
				<form onSubmit={this.formSubmitHandler}>
					<div>
						<input type="text" name="title"
							placeholder="Item title"
							value={this.state.form.title}
							onChange={this.inputChangeHandler} />
					</div>
					<div>
						<label>
							Priority:
							<select name="priority" value={this.state.form.priority} onChange={this.inputChangeHandler}>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</label>
					</div>
					<input type="submit" disabled={this.state.form.title.length < 1} />
				</form>
			</div>
		);
	}
}

export default ListItemForm;