const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require('./tables');

//requirement and code for the database users like CRUD operations of that particlar users
const app = express();
app.use(bodyParser.json());

router.get('/getuser', async (req, res) => {
    const dbUsers = await User.findAll();
    res.json(dbUsers);
});

router.post('/adduser', async (req, res) => {
    const { userName, password } = req.body;
    console.log(req.body);

    if (!userName || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const username = await User.findOne({ where: { userName } });
    if (username) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = await User.create({ userName, password });
    res.send(newUser);
});

router.delete('/deleteuser/:id', async (req, res) => {
    const { id } = req.params;
    await User.destroy({
        where: {
            userID: id
        }
    });
    res.json({ message: 'User deleted' });
});

router.put('/updateuser/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ error: 'Username and Password required' });
    }
    const user = await User.findOne({ where: { userID: id } });

    if (!user) {
        return res.status(400).json({ error: 'User not exist into the database' });
    }

    await User.update({ userName, password }, { where: { userID: id } });
    res.send({ message: 'User updated successfully' });

})

module.exports = router;