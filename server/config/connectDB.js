import mongoose from "mongoose";
const connectDB = async () => {
	const dbURI = process.env.MONGO_URI;
	mongoose
		.connect(dbURI)
		.then(() => console.log("MongoDB connected..."))
		.catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;
