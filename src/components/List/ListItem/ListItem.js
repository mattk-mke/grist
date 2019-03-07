import React from 'react';
import axios from '../../../axios';

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
	
	return (
		<li>
			<span onClick={toggleItemPurchased}
				style={props.listItem.isPurchased ? {textDecoration: "line-through"} : null}>{props.listItem.title}</span>
			<button onClick={deleteItemHandler}>x</button>
		</li>
	);
}

export default listItem;