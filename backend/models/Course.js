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
    // tags: {
    //     type: [String],
    //     require: true,
    //     enum: ['sports', 'racing', 'action', 'rpg']
    // },
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
    }
},
    { timestamps: true }
);

const Course = model('Course', courseSchema);

module.exports = Course;


