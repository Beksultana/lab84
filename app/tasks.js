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

router.get('/', auth, (req, res) => {

    if (!req.user){
        res.status(401)
    }

    TaskSchema.find({user: req.user._id})
        .then(result => res.send(result))
        .catch(error => res.send(error));
});

router.put('/:id', auth, async (req, res) => {

        try {
            const task = await TaskSchema.updateOne({_id: req.params.id}, {$set : req.body});
            return res.send(task)
        } catch (error) {
            res.status(400).send(error)
        }

});

router.delete('/:id', async (req, res) => {
    const  task = await TaskSchema.findByIdAndDelete({_id: req.params.id});
    if (!task) {
        res.status(400).send({error: "Task not found"})
    }

    res.send({message: "OK"})

});

module.exports = router;