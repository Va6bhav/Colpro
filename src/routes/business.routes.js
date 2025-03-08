import { Router } from "express";
import { registerBusiness } from "../controllers/business.controllers.js";

const router = Router();

router.route("/register").post(registerBusiness);

export default router;