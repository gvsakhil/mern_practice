const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', async (req, res) => {
    const userData = await User.find();
    return res.json(userData);
});

router.post('/addUser', async (req, res) => {
    const username = req.body.username;
    const newUser = new User({ userName: username });

    const userCreated = await newUser.save();
    if (userCreated._id) {
        return res.send({ status: true });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    const user = await User.findByIdAndDelete({ _id: req.params.id.trim() });
    if (user._id) {
        res.send({ status: true });
    } else {
        res.send({ status: true });
    }
});

module.exports = router;