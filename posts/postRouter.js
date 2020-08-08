const express = require('express');

const router = express.Router();
const Post = require('./postDb');

function validatePostId(req, res, next) {
	const postId = req.params.postId;
	req.postId = postId;

	const text = req.body;
	req.text = text;

	next();
}

//Get all posts
router.get('/', (req, res) => {
	Post.get()
		.then((posts) => {
			if (posts.length === 0) {
				return res.status(400).json({ error: 'The posts do not exist' });
			}
			return res.status(200).json(posts);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error' });
		});
});

//Get the post with a particular ID
router.get('/:postId', validatePostId, (req, res) => {
	Post.getById(req.postId)
		.then((user) => {
			if (!user) {
				return res.status(404).json({ error: 'Invalid user id.' });
			}
			return res.status(200).json(user);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error' });
		});
});

//Delete a post with a particular ID
router.delete('/:postId', validatePostId, (req, res) => {
	Post.remove(req.postId)
		.then((id) => {
			if (!id) {
				return res.status(404).json({ error: 'Invalid user id.' });
			}
			return res.status(200).json();
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error' });
		});
});

//Update a post with a particular ID
router.put('/:postId', validatePostId, (req, res) => {
	if (req.text.length === 0) {
		return res.status(400).json({ message: 'The text field is required' });
	}
	Post.update(req.postId, req.text)
		.then((update) => {
			return res.status(200).json(req.text);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error' });
		});
});

module.exports = router;
