const bodyParser = require('body-parser');
const express = require('express');
const PORT = 7070;
const { dataBase, DataBaseUSer, DataBaseUserTask } = require('./data_tables.js');
const userRoute = require('./dataBaseUsers.js');
const userTaskRoute = require('./userTasks.js');
const http = require('http');
const { constrainedMemory } = require('process');



const app = express();
app.use(bodyParser.json());
app.use('/dbusers', userRoute);
app.use('/dbusertask', userTaskRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

