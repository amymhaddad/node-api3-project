import React from 'react';

function UserCard(props) {
	return (
		<div>
			{props.name}
			{props.text}
		</div>
	);
}

export default UserCard;
