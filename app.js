const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();
require('dotenv').config();

// database connection
mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to database`);
});

// const corsOptions = {
// 	origin: ['http://localhost:3000'],
// 	optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

//allow resource sharing from all origins
// ap.use(cors());


// middlewares
app.use(express.json());

// routes
const courseRoutes = require('./routes/course');
app.use('/api/courses', courseRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

//get everything
// const courseRoutesAll = require('./routes/courseall');
// app.use('/api/courses/all', courseRoutesAll);

app.listen(port , () => {
	console.log(`App is listening on port ${port}`);
});
