const express = require('express')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.get('/:id', getWorkout)
//require auth to prevent 
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)

// GET a single workout

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
// router.patch('/:id', updateWorkout)

module.exports = router