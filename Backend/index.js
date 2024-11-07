const bodyParser = require('body-parser');
const express = require('express');
const PORT = process.env.PORT || 7070;
const userRoute = require('./users.js');
const userTaskRoute = require('./tasks.js');

const app = express();
app.use(bodyParser.json());
app.use('/users', userRoute);
app.use('/task', userTaskRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

