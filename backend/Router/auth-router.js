import express from 'express';
import controller from '../Controllers/auth-controller.js'
const router = express.Router();

router.route("/").post(controller.homeAPI)
router.route("/login").post(controller.login)
router.route("/verifyAPIForSOS").get(controller.verifyAPIForSOS)
router.route("/verifyAPIForAIRLINES").get(controller.verifyAPIForAIRLINES)
router.route("/savedataAPI").post(controller.savedataAPI)
router.route("/altitudeData").get(controller.altitudeData)

export default router;