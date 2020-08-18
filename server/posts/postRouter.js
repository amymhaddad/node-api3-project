const express = require('express');

const router = express.Router();
const Post = require('./postDb');
 
const {validatePostId, validatePostUpdate} = require("../middlewares/Middleware")

//Get all posts
router.get('/', (req, res) => {
	Post.get()
		.then((posts) => {
			return res.status(200).json(posts);
		})
		.catch((error) => {
			return res.status(500).json({ error: 'Server error' });
		});
});

//Get the post with a particular ID
router.get('/:postId', validatePostId, (req, res) => {
	Post.getById(req.params.postId)
	.then(post => {
		if (!post)
			return res.status(404).json({ error: "Post id is not found" })
		return res.status(200).json(post)
	})
	.catch((error) => {
		return res.status(500).json({ error: 'Server error' });
	});
});

//Delete a post with a particular ID
router.delete('/:postId', validatePostId, (req, res) => {
	Post.remove(req.params.postId)
	.then(count => {
		if (!count)
			return res.status(404).json({ error: "Post id is not found" })
		return res.sendStatus(204)
	})
	.catch((error) => {
		return res.status(500).json({ error: 'Server error' });
	});
});

//Update a post with a particular ID
router.put('/:postId', [validatePostId, validatePostUpdate], (req, res) => {
	Post.update(req.params.postId, req.body)
	.then(count => {
		if (!count)
			return res.status(404).json({ error: "Post id is not found" })
		return res.status(200).json(req.body)
	})
	.catch((error) => {
		return res.status(500).json({ error: 'Server error' });
	})
});

module.exports = router;
