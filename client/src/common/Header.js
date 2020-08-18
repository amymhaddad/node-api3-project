import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
	const activeStyle = { color: 'navy' };
	return (
		<nav>
			<NavLink activeStyle={activeStyle} to="/">
				Home
			</NavLink>
			{' | '}
			<NavLink activeStyle={activeStyle} to="/users">
				Users
			</NavLink>
		</nav>
	);
}

export default Header;
