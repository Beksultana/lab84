const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const TaskSchema = require('../models/Task');

router.post('/', auth, async (req, res) => {

    const task = new TaskSchema({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description,
    });

    task.status = "new";

    try {
        await task.save();
        return res.send(task);
    } catch (error) {
        res.status(401).send({error: "error user!"});
    }
});



module.exports = router;