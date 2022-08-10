const router = require('express').Router();
const User = require('../models/User');
// const bcrypt = require('bcrypt');

// create a user
router.post('/register', async (req, res) => {
    try {
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        // save user and send response
        const user = await newUser.save();
        res.status(200).json(user.username);
        console.log(user)
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

// login

router.post('/login', async (req, res) => {
    try {
        // find user
        const user = User.findOne({ username: req.body.username });
        !user && res.status(400).json('Invalid login credentials!');

        // validate password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json('Invalid login credentials!');

        // send response
        res.status(200).json({ _id: user._id, username: username });
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all users

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;