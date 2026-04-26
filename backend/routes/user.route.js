import {Router} from "express"
import { login, register, updateUserProfile } from "../controllers/user.controllers.js";
import { Protect } from "../middleware/protect.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login)

router.route("/update_profile_data").post(Protect,updateUserProfile)
export default router;