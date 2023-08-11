const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    exercise1: {
        type: String,
    },
    weight1: {
        type: Number,
    },
    exercise2: {
        type: String,
    },
    weight2: {
        type: Number,
    },
    exercise3: {
        type: String,
    },
    weight3: {
        type: Number,
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)