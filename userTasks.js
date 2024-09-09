const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { User, Tasks } = require("./data_tables");

const app = express();
app.use(bodyParser.json());

router.get("/gettask", async (req, res) => {
    const userTasks = await Tasks.findAll();
    res.json(userTasks);
});

router.post("/addtask/:userId", async (req, res) => {
    const { userId } = req.params;
    const { taskName, taskDescription } = req.body;
    if (!taskName || !taskDescription) {
        return res
            .status(400)
            .json({ error: "Task name and description required" });
    }
    const user = await User.findOne({ where: { userID: userId } });
    if (!user) {
        return res.status(400).json({ error: "User not exist in database" });
    }
    const newUserTask = await Tasks.create({
        UserId: userId,
        taskName,
        taskDescription,
    });
    res.send(newUserTask);
});

router.delete("/deletetask/:userId/:id", async (req, res) => {
    const { userId, id } = req.params;

    const user = await User.findOne({ where: { userID: userId } });

    if (!user) {
        return res.status(400).json({ error: "User not exist in database" });
    }
    const mytask = await Tasks.findOne({
        where: { taskID: id, UserId: userId },
    });

    if (!mytask) {
        return res.status(400).json({ error: "Task not exist in database" });
    }
    await Tasks.destroy({
        where: { taskID: id, UserId: userId },
    });
    res.send("Task deleted");
});

router.put("/updatetask/:userId/:id", async (req, res) => {
    const { userId, taskId } = req.params;
    const { taskName, taskDescription } = req.body;

    if (!taskName || !taskDescription) {
        return res
            .status(400)
            .json({ error: "Task and description required for update" });
    }

    const myTask = await Tasks.findOne({
        where: { taskID: taskId, UserId: userId },
    });

    if (!myTask) {
        return res.status(404).json({ error: "Task not found" });
    }

    const user = await User.findOne({ where: { UserId: userId } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await Tasks.update(
        { taskName, taskDescription },
        { where: { taskID: taskId, UserId: userId } }
    );
    res.send(req.body);
    console.log("Task updated for user");
});

module.exports = router;
