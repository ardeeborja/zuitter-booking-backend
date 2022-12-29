const Course = require('./../models/course');

module.exports.add = function(params) {

	let course = new Course({
		name: params.name,
		description: params.description,
		price: params.price,
	})

	return course.save().then(( course, err) => {
		if (err) {
			return false
		} else{
			return true
		}
	})
}


module.exports.getAll = function() {
	// return all courses
	// 	courses result of our query
	return Course.find({ isActive: true}).then( courses => courses)
}

module.exports.get = (params) => Course.findById(params).then(course => course)


module.exports.update = params => {
	let { id, name, description, price } = params
	return Course.findByIdAndUpdate(id, { name, description, price}).then( (doc, err) => {
		return err ? false : true
	} )
}


module.exports.archive = params => {

	return Course.findByIdAndUpdate(params, {isActive: false})
	.then( (doc, err )=> {
		return err ? false : true
	})
}


module.exports.enable = params => {
	return Course.findByIdAndUpdate(params, {isActive: true})
	.then( (doc, err) => {
		return err ? false : true
	} )
}

module.exports.getEverything = function() {
	// return all courses
	// 	courses result of our query
	return Course.find().then( courses => courses)
}