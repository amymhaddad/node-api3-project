import React from 'react';
import App from './components/App';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
const myStorage = window.localStorage;

render(
	<Router>
		<App 
			localStorage = {myStorage}
		/>
	</Router>,
	document.getElementById('root')
);
