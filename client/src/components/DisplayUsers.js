import React from 'react';
import { Link } from 'react-router-dom';

function DisplayUsers(props) {
	return (
		<div className="userCard">
			<div>
				<Link to={`/users/${props.id}`} className="name">
					{props.name}
				</Link>
			</div>
		</div>
	);
}

export default DisplayUsers;
