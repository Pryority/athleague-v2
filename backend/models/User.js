const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            minlength: 3,
            maxlength: 20,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'It should match an email address.']
        },
        password: {
            type: String,
            require: true,
            minlength: 6
        },
    },
    {
        toJSON: {
            virtuals: true
        }
    },
    { timestamps: true },
    { runValidators: true }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    const validPassword = await bcrypt.compare(password, this.password);
    if (!validPassword) {
        res.status(400).json('Invalid login credentials!');
    }
    return validPassword;
};

const User = model('User', userSchema);

module.exports = User;


