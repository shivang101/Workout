const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    //-1 is descending order
    const user_id = req.user._id
    const workouts = await Workout.find({ user_id }).sort({ createdAt: 1 })

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    //check if the id is even of mongoose type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    console.log("Validating before creating");

    const { title, exercise1, weight1, exercise2, weight2, exercise3, weight3 } = req.body
    let emptyFields = []
    if (!title) {
        emptyFields.push('title');
    }
    if (!exercise1) {
        emptyFields.push('exercise1');
    }
    if (!exercise2) {
        emptyFields.push('exercise2');
    }
    if (!exercise3) {
        emptyFields.push('exercise3');
    }
    if (weight1 && !exercise1) {
        emptyFields.push('exercise1');
    }
    if (weight2 && !exercise2) {
        emptyFields.push('exercise2');
    }
    if (weight3 && !exercise3) {
        emptyFields.push('exercise3');
    }
    if (exercise1 && !weight1) {
        emptyFields.push('weight1');
    }
    if (exercise2 && !weight2) {
        emptyFields.push('weight2');
    }
    if (exercise3 && !weight3) {
        emptyFields.push('weight3');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill the following fields in the red', emptyFields })
    }
    // add to the database
    try {
        console.log("Creating");
        const user_id = req.user._id
        const workout = await Workout.create({ title, exercise1, weight1, exercise2, weight2, exercise3, weight3, user_id })
        res.status(200).json(workout)
    } catch (error) {
        console.log("here");

        console.log(error);

        res.status(400).json({ error: error.message })
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}

// update a workout
// const updateWorkout = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: 'No such workout' })
//     }

//     const workout = await Workout.findOneAndUpdate({ _id: id }, {
//         ...req.body
//     })

//     if (!workout) {
//         return res.status(400).json({ error: 'No such workout' })
//     }

//     res.status(200).json(workout)
// }

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
}