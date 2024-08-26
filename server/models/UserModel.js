import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your name"],
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			unique: true,
		},
		mobileNo: {
			type: Number,
			required: [true, "Please enter your mobile number"],
		},
		city: {
			type: String,
			required: [true, "Please enter your city"],
		},
		subscription: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);



const Users = mongoose.model("Users", schema);
export default Users;
