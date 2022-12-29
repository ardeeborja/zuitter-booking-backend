const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user');
// const jwt = require('jsonwebtoken');

const auth = require('./../auth');

router.post('/', (req, res) => {
	userController.register(req.body).then(result => res.send(result))
})

router.post('/email-exists', (req, res) => {
	userController.emailExists(req.body).then(result => res.send(result))
})


router.post('/login', (req, res) => {
	// userController.login(req.body).then(result => res.send(result))
	userController.login(req,res)
})

router.post('/enroll', auth.verify, (req,res) => {
	// userId = get this in token
	// courseId = body
	const params = {
		userId: auth.decode(req.headers.authorization).id,
		courseId: req.body.courseId
	}

	userController.enroll(params).then(result => res.send(result))
})


router.get('/', (req,res) => {
	
	console.log("hello, this route has been triggered from an app")
	
	userController.sample().then(result => res.send(result))

})


router.get('/details', auth.verify, (req,res) => {
	const decodedToken = auth.decode(req.headers.authorization)
	
	userController.get({userId : decodedToken.id}).then( user => res.send(user))

	// console.log("routes", user)

})

//get all enrollees for admin user
router.get('/details/:id', (req,res) => {
	
	userController.get({userId : req.params.id}).then(user => res.send(user))

	// console.log("routes", user)

})

//update profile
router.put('/:id', auth.verify, (req,res) => {
	// console.log('im from user routes editProfile')
	// console.log('header', req.headers)
	// console.log('body', req.body)

	userController.update(req.body).then( result => res.send(result))
});




module.exports = router;

