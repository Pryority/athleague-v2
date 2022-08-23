const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const courseSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        min: 3,
        max: 20,
    },
    type: {
        type: [String],
        require: true,
        enum: ['adventure', 'objective', 'lookout', 'freestyle']
    },
    desc: {
        type: String,
        require: true,
        min: 3,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        require: true
    },
    long: {
        type: Number,
        require: true
    },
    completions: {
        type: Number,
        require: true
    },
    checkpoints: {
        type: Number,
        require: true
    }
},
    { timestamps: true }
);

const Course = model('Course', courseSchema);

module.exports = Course;


