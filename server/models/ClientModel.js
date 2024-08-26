import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		image: {
			public_id: {
				type: String,
				required: [true, "Please provide the image public ID"],
			},
			url: {
				type: String,
				required: [true, "Please provide the image URL"],
			},
		},
		name: {
			type: String,
			required: [true, "Please enter client name"],
		},
		description: {
			type: String,
			required: [true, "Please enter client description"],
		},
		destination: {
			type: String,
			required: [true, "Please enter client description"],
		},
	},
	{ timestamps: true }
);

const Clients = mongoose.model("Clients", schema);
export default Clients;
