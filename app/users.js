const express  = require('express');
const UserSchema = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {

    const user = new UserSchema(req.body);

    user.generateToken();

    try {
        await user.save();
        return res.send({token: user.token});
    } catch (error) {
        res.status(401).send(error);
    }

});

router.post('/session', async (req, res) => {

    const user = await UserSchema.findOne({username: req.body.username});
    if (!user){
        return res.status(401).send({error: 'Username/Password incorrect'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
        return res.status(401).send({error: 'Username/Password incorrect'});
    }

    user.generateToken();
    await user.save();
    return res.send({token: user.token});
});


module.exports = router;