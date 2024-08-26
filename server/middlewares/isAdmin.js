import Admins from "../models/AdminModel.js";
import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
	const { token } = req.cookies;

	if (!token)
		return res.status(401).json({
			success: false,
			message: "Unauthorized User",
		});

	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	console.log(decoded);

	const admin = await Admins.findById(decoded._id);

	if (!admin)
		return res.status(401).json({
			success: false,
			message: "Unauthorized User",
		});

	next();
};
