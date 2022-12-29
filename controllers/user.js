const User = require('../models/user');
const Course = require('./../models/course');
const bcrypt = require('bcrypt');
const {createAccessToken} = require('./../auth');

module.exports.emailExists = (params) => {
	return User.find({email: params.email}).then(result => {
		return result.length > 0 ? true : false
	})
}

module.exports.register = (params) => {
	let newUser = new User({
		firstName: params.firstName,
		lastName: params.lastName,
		email: params.email,
		mobileNo: params.mobileNo,
		// 10 = salt/string of characters added to the password before hashing
		//"juan1234abcdefghij" = "rejdfposjdfpsdf"
		password: bcrypt.hashSync(params.password, 10)
	})

	return newUser.save().then((user,err) => {
		return (err) ? false : true
	})
}


// module.exports.login = (params) => {
module.exports.login = (req,res) => {
	//email
	// password
	// return User.findOne({email: params.email}).then(user => {
	// 	let resultComparePassword = bcrypt.compareSync(params.password, user.password);
	// 		console.log("params :", params)
	// 		console.log("user: ", user)
	// 	return resultComparePassword;

	// }).catch(err => {
	// 	return err
	// })


	//email correct; password not correct
	//both not correct
	//both correct
	// return User.findOne({email: params.email}, (err, user)=>{
	// 	if (err) { return err}
	// 	console.log(user === null)
	// 	if (user === null) { return false}
	// 	let resultComparePassword = bcrypt.compareSync(params.password, user.password);
	// 	return resultComparePassword;
		

	// })

	//email correct; password wrong
	User.findOne({email: req.body.email})
	.then (user => {
		if (!user) {
			res.send(false)
		} else {
			// res.send(user)
			console.log(req.body.password)
			console.log(user.password)
			
			let comparePasswordResult = bcrypt.compareSync(req.body.password, user.password);
			if (!comparePasswordResult) {
				res.send(false)
			} else {
				// res.send(true)
				//send token if true

				res.send({accessToken: createAccessToken(user)})
			}
		}
	}).catch (err => {
		res.status(500).send("Server Error")
	})


}


module.exports.get = (params) => {
	// return User.findById(params.userId).then(user => {
	// 	user.password = undefined
	return User.findById(params.userId).select({password: 0}).then(user => {

		//comment out below to enhance the controller to get courseName of the course where the user is/are enrolled to	
		return user


		//get all courseID
		// console.log(user.enrollments.length)
		// console.log(user.enrollments[0]._id)
		// user.enrollments.forEach(function(user){
		// 	console.log(user.courseId + " next");
		// });

		// return user.enrollments[1].courseId
		////////////////////////////////////////////////
		// return user.enrollments.forEach((user) => {
		// 	console.log("Q ", user.courseId)

		// 	return Course.findById(user.courseId).then (course => {
		// 		console.log(course.name)
		// 		// console.log(course)
		// 	 		// return course

		// 	})

		// })
		/////////////////////////////////////////////////
		// return User.findById(params.userId).then(user => {
			// user.enrollments.push({courseId: params.courseId})

			// return user.save().then((user) => {

			// })
		// })


	})
}


module.exports.enroll = params => {
	// return User.findById(params.userId).then( user => {
	// 	user.enrollments.push({courseId: params.courseId})

	// 	return user.save((err,user) =>{
	// 		return Course.findById( params.courseId).then( course => {
	// 			course.enrollees.push({userId : params.userId})

	// 			return course.save((err, course) =>{
	// 				return err ? false : true
	// 			})
	// 		})
	// 	})
	// })

	return User.findById(params.userId).then(user => {
		console.log('enroll', user)
		console.log('length', user.enrollments.length)
		console.log('params', params.courseId)
		let notEnrolled = true
		let i;
		for (i = 0; i < user.enrollments.length; i++) {
			console.log('for loop')
			if (user.enrollments[i].courseId === params.courseId) {
				console.log('IF')
				return false
			} else {
				console.log('ELSE')
			}	
			
		}

		if (notEnrolled === true) {
				console.log('if not enrolled')
				user.enrollments.push({courseId: params.courseId})

				return user.save().then((user) => {
					return Course.findById(params.courseId).then (course => {
						course.enrollees.push({userId : params.userId})
						return course.save().then(course => {
							return course ? true: false
						})
					})
				})

		}




		// user.enrollments.push({courseId: params.courseId})

		// return user.save().then((user) => {
		// 	return Course.findById(params.courseId).then (course => {
		// 		course.enrollees.push({userId : params.userId})
		// 		return course.save().then(course => {
		// 			console.log('xxx', course)
		// 			return course ? true: false
		// 		})
		// 	})
		// })
	})
}

module.exports.sample = () => {

	let dataSample = {
		response: "hello, this is from the Server..."
	}

	let data = new Promise((res,rej) => {

		res(dataSample)
		// rej(error)
	})

	return data
}


module.exports.update = params => {
	// console.log('im from controller editProfile')
	// console.log('params', params)
	let { id, firstName, lastName, email, mobileNo } = params
	return User.findByIdAndUpdate(id, { firstName, lastName, email, mobileNo }).then( (doc, err) => {
		return err ? false : true
	} )
}
