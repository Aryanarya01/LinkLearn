import {Router} from "express"
import { getAllUserProfile, getUserAndProfile, login, register, updateProfileData, updateUserProfile } from "../controllers/user.controllers.js";
import { Protect } from "../middleware/protect.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login)

router.route("/user_update").post(Protect,updateUserProfile)
router.route("/get_user_and_Profile").get(Protect,getUserAndProfile)
router.route("/update_profile_data").post(Protect,updateProfileData)
router.route("/user/get_all_users").get(Protect,getAllUserProfile)
export default router;