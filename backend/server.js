const express = require('express');
const dotenv = require('dotenv');

const authRouter = require('./routes/auth.routes');
const connectDB = require('./config/db.config');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    // root route http://localhost:8080/
    res.send("This is Home!");
});

app.use('/api/auth', authRouter);

app.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}`);
    await connectDB();
});

