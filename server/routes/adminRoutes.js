import express from "express";
import {
	createClientController,
	loginController,
	createProjectController,
	getUserController,
	getSubscribeUserController,
} from "../controllers/adminController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/login").post(loginController);
router.route("/createProject").post(singleUpload, createProjectController);
router.route("/createClient").post(singleUpload, createClientController);
router.route("/getusers").get(getUserController);
router.route("/getsubscribeusers").get(getSubscribeUserController);

export default router;
