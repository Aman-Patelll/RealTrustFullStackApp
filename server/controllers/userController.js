import Users from "../models/UserModel.js";
import Projects from "../models/ProjectModel.js";
import Clients from "../models/ClientModel.js";

export const contactUsController = async (req, res) => {
	try {
		const { name, email, mobileNo, city } = req.body;

		if (!name || !email || !mobileNo || !city) {
			return res.status(500).send({
				success: false,
				message: "Please Add All Detail",
			});
		}

		let user = await Users.findOne({ name, email, mobileNo, city });

		if (user) {
			return res.status(409).send({
				success: false,
				message: "user already exist",
			});
		}

		await Users.create({
			name,
			email,
			mobileNo,
			city,
		});

		res.status(200).send({
			success: true,
			message: "User Added Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in client Api",
		});
	}
};

export const subscriptionController = async (req, res) => {
	try {
		const email = req.params.email;

		const user = await Users.findOne({ email });

		if (!user) {
			return res.status(404).send({
				success: false,
				message: "User Not Found",
			});
		}

		const updatedUser = await Users.findOneAndUpdate(
			{ email },
			{ $set: { subscription: true } },
			{ new: true }
		);

		res.status(200).send({
			success: true,
			message: "User Subscription Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in user Subscription Api",
		});
	}
};

export const getProjectController = async (req, res) => {
	try {
		const project = await Projects.find({});

		res.status(200).send({
			success: true,
			message: "Projects featch Successfully",
			project,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in get project Api",
		});
	}
};

export const getClientController = async (req, res) => {
	try {
		const client = await Clients.find();

		res.status(200).send({
			success: true,
			message: "Clientts featch Successfully",
			client,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in get client Api",
		});
	}
};
