import React from 'react';
import { Link } from 'react-router-dom';

const listsItem = ({list, listType, deleteList, userId}) => (
	<li>
		<Link to={`/list/${list.id}`}>{list.title}</Link>
		{listType === "user" || (list.userId === userId )?
			<button onClick={() => deleteList(list.id)}>x</button> : null}
	</li>
);

export default listsItem;