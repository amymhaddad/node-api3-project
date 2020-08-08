const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

let logger = function(req, res, next) {
	let date = `Date: ${Date.now()}`;
	let method = `Method: ${req.method}\n`;
	let url = `url: ${req.url}\n`;
	let path = `path: ${req.path}\n`;
	console.log(date, method, url, path);
	next();
};

app.use(logger);

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
	res.send('welcome');
});

app.listen(port, () => {
	console.log('port', port);
});
