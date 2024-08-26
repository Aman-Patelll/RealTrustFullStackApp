import Admins from "../models/AdminModel.js";
import Projects from "../models/ProjectModel.js";
import Clients from "../models/ClientModel.js";
import getDataUri from "../utils/dataUri.js";
import Users from "../models/UserModel.js";
import cloudinary from "cloudinary";

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);

		if (!email || !password) {
			return res.status(500).send({
				success: false,
				message: "Please Add Email Or Password",
			});
		}

		const admin = await Admins.findOne({ email, password });

		if (!admin) {
			return res.status(404).send({
				success: false,
				message: "Admin not Found",
			});
		}

		const token = admin.generateToken();

		res
			.status(200)
			.cookie("token", token, {
				expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
				secure: process.env.NODE_ENV === "development" ? true : false,
				httpOnly: process.env.NODE_ENV === "development" ? true : false,
				sameSite: process.env.NODE_ENV === "development" ? true : false,
			})
			.send({
				success: true,
				message: "Login Successfully",
				token,
				admin,
			});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Login Api",
			error,
		});
	}
};

export const createProjectController = async (req, res) => {
	try {
		const { name, description } = req.body;
		const file = req.file;

		console.log(req.file);

		if (!name || !description || !file) {
			return res.status(500).send({
				success: false,
				message: "Please Add Name Or Description Or Image",
			});
		}

		let project = await Projects.findOne({ name });

		if (project) {
			return res.status(409).send({
				success: false,
				message: "Project already exist",
			});
		}

		const fileUri = getDataUri(file);
		console.log(fileUri);

		const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

		project = await Projects.create({
			image: {
				public_id: mycloud.public_id,
				url: mycloud.secure_url,
			},
			name,
			description,
		});

		res.status(200).send({
			success: true,
			message: "Project Added Successfully",
			project,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Project Api",
			error: error.message,
		});
	}
};

export const createClientController = async (req, res) => {
	try {
		const { name, description, destination } = req.body;
		const file = req.file;

		console.log(req.body);

		if (!name || !description || !destination || !file) {
			return res.status(500).send({
				success: false,
				message: "Please Add Name Or Description Or Image",
			});
		}

		let client = await Clients.findOne({ name });

		if (client) {
			return res.status(409).send({
				success: false,
				message: "client already exist",
			});
		}

		const fileUri = getDataUri(file);
		const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

		client = await Clients.create({
			image: {
				public_id: mycloud.public_id,
				url: mycloud.secure_url,
			},
			name,
			description,
			destination,
		});

		res.status(200).send({
			success: true,
			message: "Client Added Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in client Api",
		});
	}
};

export const getUserController = async (req, res) => {
	try {
		const users = await Users.find();

		res.status(200).send({
			success: true,
			message: "User Feach Successfully",
			users,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in get user Api",
		});
	}
};

export const getSubscribeUserController = async (req, res) => {
	try {
		const users = await Users.find({ subscription: true });

		res.status(200).send({
			success: true,
			message: "Subscribe User Feach Successfully",
			users,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in get user Api",
		});
	}
};
