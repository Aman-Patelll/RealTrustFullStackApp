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
			required: [true, "Please enter project name"],
		},
		description: {
			type: String,
			required: [true, "Please enter project description"],
		},
	},
	{ timestamps: true }
);

const Projects = mongoose.model("Projects", schema);
export default Projects;
