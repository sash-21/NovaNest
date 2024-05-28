const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const authRouter = require('./routes/auth.routes');
const connectDB = require('./config/db.config');
const errorHandler = require('./utils/errorHandler');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

// To read data from frontend or an external client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

app.use('/api/auth', authRouter);

app.use(errorHandler); // Last middleware to be called for error handling

app.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}`);
    await connectDB();
});

