import express from "express";
import {
	contactUsController,
	getClientController,
	getProjectController,
	subscriptionController,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/contactUs").post(contactUsController);
router.route("/subscribe/:email").put(subscriptionController);
router.route("/project").get(getProjectController);
router.route("/client").get(getClientController);

export default router;
