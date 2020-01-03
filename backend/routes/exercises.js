const router = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then((exercises) => {
        res.json(exercises);
    })
    .catch((err) => {
        res.status(400).json('Error: ', err);
    });
});



router.route('/add').post((req, res) => {
    const username = req.body.username;
    const duration = Number(req.body.duration);
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const ex = new Exercise({username,duration, description, date});
    ex.save()
    .then(() => {
        res.json('success');
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json('Error: ', err);
    });
});


router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exer => res.json(exer))
    .catch((err) => {
        res.status(400).json('error'+err);
    });
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted'))
    .catch(() => res.status(404).json('Error'+err));
    
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save()
        .then(() => res.json('Successfully updated'))
        .catch((err) => res.status(400).json('Error' + err));
    })
    .catch((err) => {
        res.status(404).json('Error' + err);
    });
});

module.exports = router;