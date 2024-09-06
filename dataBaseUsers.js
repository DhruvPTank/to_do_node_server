const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { dataBaseUser, dataBaseUserTask } = require('./data_tables');


const app = express();
app.use(bodyParser.json());

router.get('/getUser', async (req, res) => {
    const dbUsers = await dataBaseUser.findAll();
    res.json(dbUsers);
});

router.post('/addDataBaseUser', async (req, res) => {
    const { userName, userPassword } = req.body;
    console.log(req.body);

    if (!userName || !userPassword) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const username = await dataBaseUser.findOne({ where: { userName } });
    if (username) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = await dataBaseUser.create({ userName, userPassword });
    res.send(newUser);
});

router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    await dataBaseUser.destroy({
        where: {
            userID: id
        }
    });
    res.json({ message: 'User deleted' });
});

router.put('/updateDataBaseUser/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, userPassword } = req.body;
    if (!userName || !userPassword) {
        return res.status(400).json({ error: 'Username and Password required' });
    }
    const user = await dataBaseUser.findOne({ where: { userID: id } });

    if (!user) {
        return res.status(400).json({ error: 'User not exist into the database' });
    }

    await dataBaseUser.update({ userName, userPassword }, { where: { Uid: id } });
    res.send({ message: 'User updated successfully' });

})

module.exports = router;