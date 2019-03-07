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

	let content = (<>
		<span onClick={toggleItemPurchased}
			style={props.listItem.isPurchased ? {textDecoration: "line-through"} : null}>{props.listItem.title}</span>
		<button onClick={() => props.editItem(props.listItem.id)}>edit</button>
		<button onClick={deleteItemHandler}>x</button>
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
		<li>
			{content}
		</li>
	);
}

export default listItem;