const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { dataBaseUser, dataBaseUserTask } = require('./data_tables');



const app = express();
app.use(bodyParser.json());

router.get('/getUserTask', async (req, res) => {
    const userTasks = await dataBaseUserTask.findAll();
    res.json(userTasks);
});



module.exports = router;
