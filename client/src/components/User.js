import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import Posts from '../common/Posts';
import { serverAPI } from '../common/Urls';

function User(props) {
	let [ user, setUser ] = useState([]);

	useEffect(() => {
		let url = `${serverAPI}/${props.match.params.id}/posts`;
		axios
			.get(url)
			.then((response) => {
				setUser(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<div>
				<Posts />
			</div>

			<div>{user.map((userDetails) => <UserCard key={userDetails.id} text={userDetails.text} />)}</div>
		</div>
	);
}

export default User;
