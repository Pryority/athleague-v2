const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const courseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    desc: {
        type: String,
        required: true,
        min: 3,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
);

const Course = model('Course', courseSchema);

module.exports = Course;


