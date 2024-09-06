const bodyParser = require('body-parser');
const express = require('express');
const PORT = 7070;
 const {dataBase, DataBaseUSer, DataBaseUserTask} = require('./data_tables.js');
const userRoute = require('./dataBaseUsers.js');
const http = require('http');



const app = express();
app.use(bodyParser.json());
app.use('/dbusers', userRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

