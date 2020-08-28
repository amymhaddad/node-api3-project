const express = require('express');
const router = express.Router();

const User = require('./userDb');
const Post = require('../posts/postDb');
const { validateUserId, validateUser, validatePost } = require('../middlewares/Middleware');

//Get all of the users
router.get('/', (req, res) => {
	User.get()
		.then((users) => {
			return res.status(200).json(users);
		})
		.catch((error) => {
			console.log("eer", error)
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Get all users with a particular ID
router.get('/:userId', validateUserId, (req, res) => {
	User.getById(req.params.userId)
		.then((user) => {
			if (!user)
				return res.status(404).json({ error: 'The user was not found' });
			return res.status(200).json(user);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Delete a user with a particular ID
router.delete('/:userId', validateUserId, (req, res) => {
	User.remove(req.params.userId)
		.then((count) => {
			if (!count)
				return res.status(404).json({ error: 'User id is not found ' });
			return res.sendStatus(204);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

router.put('/:userId', [ validateUserId, validateUser ], (req, res) => {
	User.update(req.params.userId, req.body)
		.then((count) => {
			if (!count) 
				return res.status(404).json({ error: "User id is not found"})
			return res.status(200).json(req.body.name);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Add a new user
router.post('/', validateUser, (req, res) => {
	User.insert(req.body)
		.then((user) => {
			return res.status(201).json(user);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error.' });
		});
});

//Get the posts associated with a particular user
router.get('/:userId/posts', validateUserId, (req, res) => {
	const userId = req.params.userId;
	User.getById(userId)
		.then((user) => {
			if (!user)
				return res.status(404).json({ errorMessage: 'User is not found' });
			User.getUserPosts(userId).then((userPosts) => {
				return res.status(200).json(userPosts);
			});
		})
		.catch((error) => {
			res.status(500).json('Error: user is not found');
		});
});

//Add a post for a particular user
router.post('/:userId/posts', [ validateUserId, validatePost ], (req, res) => {
	const user_id = req.params.userId;
	const text = req.body.text;
	const newPost = { user_id, text };

	User.getById(req.params.userId)
	.then((user) => {
		if (!user)
			res.status(404).json({ errorMessage: 'User id is not found' });
		Post.insert(newPost)
			.then((post) => {
				res.status(201).json(post);
			})
			.catch((error) => {
				return res.status(500).json({ error: 'Server error.' });
			});
	});
});

module.exports = router;
