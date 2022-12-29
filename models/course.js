const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
	name: {
			type: String,
			required : [true, "Course name is required"]
	},
	price : {
			type: Number,
			required : [true, "Course Price is required"]
	},
	description : {
		type: String,
		required : [true, "Course description is required"]
	},
	isActive : {
		type: Boolean,
		default: true	
	},
	enrollees: [
		{
			userId: {
				type: String,
				required : [true, "User Id is required"]
				},
			enrolledOn : {
				type: Date,
				default: new Date()
			}
		}
	]
})



module.exports = mongoose.model('Course', courseSchema);
