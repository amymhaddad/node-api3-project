import React from 'react';
import Users from './Users';
import User from './User';
import Home from './Home';
import { Route } from 'react-router-dom';
import Header from '../common/Header';

function App() {
	return (
		<div>
			<Header />
			<Route path="/" exact component={Home} />
			<Route path="/users" exact component={Users} />
			<Route path="/users/:id" component={User} />
		</div>
	);
}

export default App;
