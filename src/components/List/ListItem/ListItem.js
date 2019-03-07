import React from 'react';
import axios from '../../../axios';
import ListItemForm from './ListItemForm/ListItemForm';

const listItem = (props) => {
	const deleteItemHandler = () => {
		axios.post(`listitems/destroy`, {
			id: props.listItem.id
		}, {
			headers: {
				"x-auth-token": props.token
			}
		});
	}

	const toggleItemPurchased = () => {
		axios.post(`listitems/update`, {
			id: props.listItem.id,
			isPurchased: !props.listItem.isPurchased
		}, {
			headers: {
				"x-auth-token": props.token
			}
		});
	}

	const priorities = {
		low: "#4ECDC4",
		medium: "#19D16F",
		high: "#FF6B6B"
	};

	let content = (<>
		<button className="control button is-small" title="Click to mark as purchased" onClick={toggleItemPurchased}
			style={{borderLeftColor: priorities[props.listItem.priority], textDecoration: props.listItem.isPurchased ? "line-through" : null }} >
			{props.listItem.title}
		</button>
		<div className="control">
			<button className="button is-small" title="Edit" onClick={() => props.editItem(props.listItem.id)}><i className="fas fa-pencil-alt"></i></button>
		</div>
		<div className="control">
			<button className="button is-small" title="Delete" onClick={deleteItemHandler}>
				<i className="delete is-small" />
			</button>
		</div>
		</>);

	if (props.editing) {
		content = <ListItemForm listId={props.listItem.listId}
								reload={props.getListData}
								token={props.token}
								item={props.listItem}
								editToggle={() => props.editItem(null)}
								inline /> ;
	}
	return (		
		<div className="field has-addons columns is-centered">
			{content}
		</div>
	);
}

export default listItem;