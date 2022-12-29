const router = require('express').Router()
const Course = require('./../models/course');
const CourseController = require('./../controllers/course');
const auth = require('./../auth');

// get all courses
router.get('/', (req,res)=> {
	CourseController.getAll().then(courses => res.send(courses));
});

// get all courses even the deactivated(admin)
router.get('/all', (req,res)=> {
	CourseController.getEverything().then(courses => res.send(courses));
});

// get course by id
router.get('/:id', (req,res)=> {
	CourseController.get(req.params.id).then( result => res.send(result))
});

// add course
router.post('/', auth.verify, (req,res)=> {
	CourseController.add(req.body).then( result => res.send(result))
});

// update course
router.put('/', auth.verify, (req,res) => {
	CourseController.update(req.body).then( result => res.send(result))
});

// delete course
router.delete('/:id', auth.verify, (req,res) => {
	CourseController.archive(req.params.id).then( result => res.send(result))
})

// change isActive value to true(admin)
router.put('/:id', auth.verify, (req,res) => {
	CourseController.enable(req.params.id).then( result => res.send(result))
})

// get all courses even the deactivated(admin)
// router.get('/all', (req,res)=> {
// 	CourseController.getEverything().then(courses => res.send(courses));
// });

module.exports = router;

