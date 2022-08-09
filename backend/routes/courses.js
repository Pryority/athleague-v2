const router = require('express').Router();
const Course = require('../models/Course');

// create a course

router.post('/', async (req, res) => {
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        res.status(500).json(err);
    }

})

// get all courses

module.exports = router;