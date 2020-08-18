import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayUsers from './DisplayUsers';
import UsernamesHeader from '../common/UsernamesHeader';
import { serverAPI } from '../common/Urls';

function Users() {
	const initialUsers = () => window.localStorage.getItem('users');
	const [ users, setUsers ] = useState([ initialUsers ]);

	useEffect(
		() => {
			axios
				.get(serverAPI)
				.then((respsonse) => {
					setUsers(respsonse.data);
				})
				.catch((err) => {
					console.log(err);
				});
			window.localStorage.setItem('users', users);
		},
		[ users ]
	);

	return (
		<div>
			<UsernamesHeader />
			{users.map((user) => <DisplayUsers key={user.id} id={user.id} name={user.name} />)}
		</div>
	);
}

export default Users;
