const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        const user = User.findOne({ username: req.body.username })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return res.status(404).send({ message: "User Not found." });
                }
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({ message: "Invalid Password!" });
                }

                // send response
                res.status(200).json({ _id: user._id, username: user.username, email: user.email });
            });
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