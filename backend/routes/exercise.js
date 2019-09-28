const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.get('/', async (req, res) => {
    const ExerciseData = await Exercise.find();
    return res.json(ExerciseData);
});

router.post('/addExercise', async (req, res) => {
    const username = req.body.username;
    const desc = req.body.description;
    const date = req.body.date;
    const duration = req.body.duration;
    const newExercise = new Exercise({ userName: username, description: desc, date, duration });

    const exerciseCreated = await newExercise.save();
    if (exerciseCreated._id) {
        return res.send({ status: true });
    }
});

router.delete('/deleteExercise/:id', async (req, res) => {
    const exercise = await Exercise.findByIdAndDelete({ _id: req.params.id.trim() });
    if (exercise._id) {
        return res.send({ status: true });
    } else {
        return res.send({ status: false });
    }
});

module.exports = router;