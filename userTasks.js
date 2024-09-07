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

router.post('/addUserTask/:userId', async (req, res) => {

    const { userId } = req.params;
    const { taskName, taskDescription } = req.body;
    if (!taskName || !taskDescription) {
        return res.status(400).json({ error: 'Task name and description required' });
    }
    const user = await dataBaseUser.findOne({ where: { userID: userId } });
    if (!user) {
        return res.status(400).json({ error: 'User not exist in database' });
    }
    const newUserTask = await dataBaseUserTask.create({ UserId: userId, taskName, taskDescription });
    res.send(newUserTask);
});


router.delete('/deleteUesrTask/:userId/:id', async (req, res) => {
    const { userId, id } = req.params;


})


module.exports = router;
