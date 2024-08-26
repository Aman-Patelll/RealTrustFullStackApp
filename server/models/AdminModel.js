import mongoose from "mongoose";
import JWT from "jsonwebtoken";

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "Please enter your email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please enter your password"],
			minLength: [6, "Password must be at least 6 characters"],
			select: false,
		},
	},
	{ timestamps: true }
);

// JWT token
schema.methods.generateToken = function () {
	return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};
const Admins = mongoose.model("Admins", schema);
export default Admins;
