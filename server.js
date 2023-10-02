const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const path = require('path');

const port = process.env.PORT || 5050;
connectDB();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(
	cors({
		origin: ['http://localhost:5050', 'http://localhost:3000'],
		credentials: true,
	})
);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
	res.send({ Message: 'Welcome to the RandomIdeas API' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
	console.log(`Server listening on ${port}.`);
});
