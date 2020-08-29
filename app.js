const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const usersRouter = require('./server/users/userRouter');
const postsRouter = require('./server/posts/postRouter');

const { logger } = require('./server/middlewares/Middleware');
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
