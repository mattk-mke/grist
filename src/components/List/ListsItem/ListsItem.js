import React from 'react';
import { Link } from 'react-router-dom';

const listsItem = ({list, listType, deleteList, userId}) => (
	<div className="field has-addons">
		<div className="control is-expanded">
			<Link to={`/list/${list.id}`}>
				<div className="button is-fullwidth">
					{list.title}
				</div>
			</Link>
		</div>
		<div className="control">
			{listType === "user" || (list.userId === userId )?
				<button className="button is-danger" onClick={() => deleteList(list.id)}><i className="delete"/></button> : null}
		</div>
	</div>
);

export default listsItem;