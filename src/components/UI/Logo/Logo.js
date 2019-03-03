import React from 'react';
import grist from '../../../assets/Grist.svg';

const logo = (props) => {
	return (
		<img src={grist}
			alt="Grist"
			height={props.height} />
	);
}

export default logo;