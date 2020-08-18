const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const { logger } = require('./middlewares/Middleware');
const cors = require('cors');

app.use(logger);
app.use(cors());
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
	res.send('welcome');
});

app.listen(port, () => {
	console.log('port', port);
});
