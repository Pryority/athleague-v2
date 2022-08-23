const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const courseRoute = require('./routes/courses');
const userRoute = require('./routes/users');

dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected! 🍃')
    }).catch((err) => console.log(err));

app.use('/api/courses', courseRoute);
app.use('/api/users', userRoute);

app.listen(3001, () => console.log('server server is running! 🖥'))