const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const { app, server } = require('./socket/socket');
const authRouter = require('./routes/auth.routes');
const messageRouter = require('./routes/message.routes');
const userRouter = require('./routes/user.routes');
const connectDB = require('./config/db.config');
const errorHandler = require('./utils/errorHandler');

const PORT = process.env.PORT || 8080;

__dirname = path.resolve();

dotenv.config();

// To read data from frontend or an external client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());

// To check for the user login cookies if the user logged in present
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.use(express.static(path.join(__dirname, `/frontend/dist`)));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandler); // Last middleware to be called for error handling

server.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}`);
    await connectDB();
});
