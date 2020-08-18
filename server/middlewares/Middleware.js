module.exports = {
	logger,
	validatePost,
	validatePostId,
	validatePostUpdate,
	validateUser,
	validateUserId
};

function logger(req, res, next) {
	let date = `Date: ${Date.now()}`;
	let method = `Method: ${req.method}\n`;
	let url = `url: ${req.url}\n`;
	let path = `path: ${req.path}\n`;
	console.log(date, method, url, path);
	next();
}

function validatePost(req, res, next) {
	const post = req.body.text;

	if (!post)
		return res.status(400).json({ message: 'missing required text field' });
	next();
}

function validatePostId(req, res, next) {
	const postId = req.params.postId;

	if (isNaN(postId))
		return res.status(400).json({ message: 'invalid post id' });
	next();
}

function validatePostUpdate(req, res, next) {
	const text = req.body.text;

	if (!text)
		return res.status(400).json({ message: 'Missing required text field' });
	next();
}

function validateUser(req, res, next) {
	const userName = req.body.name;

	if (!userName) 
		return res.status(400).json({ errorMessage: 'Please enter a name.' });
	next();
}

function validateUserId(req, res, next) {
	const userId = req.params.userId;
	
	if (isNaN(userId)) 
		return res.status(400).json({ message: 'invalid user id' });
	next();
}
