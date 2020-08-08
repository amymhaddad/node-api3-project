const express = require('express');

const router = express.Router();

const User = require('./userDb');
const Post = require('../posts/postDb');

//Middleware
function validateUserId(req, res, next) {
	const userId = req.params.userId;
	req.userId = userId;

	const updatedName = req.body;
	req.updatedName = updatedName;
	return next();
}

function validateUser(req, res, next) {
	const newUser = req.body;
	req.newUser = newUser;
	return next();
}

function validatePost(req, res, next) {
	const user_id = req.params.userId;
	req.user_id = user_id;

	const text = req.body.text;
	req.text = text;
	next();
}

//Get all of the users
router.get('/', (req, res) => {
	User.get()
		.then((users) => {
			if (users.length === 0) {
				return res.status(404).json({ error: 'User is not found' });
			}
			return res.status(200).json(users);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Get all users with a particular ID
router.get('/:userId', validateUserId, (req, res) => {
	User.getById(req.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: 'Invalid user id' });
			}
			res.status(200).json(user);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Delete a user with a particular ID
router.delete('/:userId', validateUserId, (req, res) => {
	User.remove(req.userId)
		.then((row) => {
			if (!row) {
				return res.status(404).json({ error: 'Invalid user id' });
			}
			return res.status(200).json();
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Update a user with a particular ID
router.put('/:userId', validateUserId, (req, res) => {
	if (!req.updatedName.name) {
		res.status(400).json({ errorMessage: 'Please enter a name.' });
	}

	User.update(req.userId, req.updatedName)
		.then((update) => {
			res.status(200).json(req.updatedName);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Add a new user
router.post('/', validateUser, (req, res) => {
	const missingName = !req.newUser.name;
	if (missingName) {
		return res.status(400).json({ message: 'Missing required name field.' });
	}

	User.insert(req.newUser)
		.then((user) => {
			return res.status(201).json(user);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Get the posts associated with a particular user
router.get('/:userId/posts', validatePost, (req, res) => {
	User.getById(req.user_id)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ errorMessage: 'User is not found' });
			}

			User.getUserPosts(req.user_id).then((userPosts) => {
				return res.status(200).json(userPosts);
			});
		})
		.catch((error) => {
			res.status(500).json('Error: user is not found');
		});
});

//Add a post for a particular user
router.post('/:userId/posts', validatePost, (req, res) => {
	const text = req.text;
	const user_id = req.user_id;

	if (!text) {
		return res.status(400).json({ message: 'Missing required text field.' });
	}

	const newPost = { user_id, text };
	Post.insert(newPost)
		.then((post) => {
			return res.status(200).json(post);
		})
		.catch((error) => {
			console.log('err', error);
			res.status(500).json('Error: user is not found');
		});
});

module.exports = router;
