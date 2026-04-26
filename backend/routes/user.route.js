import {Router} from "express"
import { getUserAndProfile, login, register, updateUserProfile } from "../controllers/user.controllers.js";
import { Protect } from "../middleware/protect.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login)

router.route("/user_update").post(Protect,updateUserProfile)
router.route("/get_user_and_Profile").get(Protect,getUserAndProfile)
export default router;