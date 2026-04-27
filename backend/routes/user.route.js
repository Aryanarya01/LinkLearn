import {Router} from "express"
import { downloadProfile, getAllUserProfile, getUserAndProfile, login, register, updateProfileData, updateUserProfile, uploadUserProfile } from "../controllers/user.controllers.js";
import { Protect } from "../middleware/protect.js";
import multer from "multer"
 
const router = Router();



const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage : storage})

router.route("/register").post(register);
router.route("/login").post(login)
router.route("/upload_profile_picture").post(Protect,upload.single('profile_picture'),uploadUserProfile)
router.route("/user_update").post(Protect,updateUserProfile)
router.route("/get_user_and_Profile").get(Protect,getUserAndProfile)
router.route("/update_profile_data").post(Protect,updateProfileData)
router.route("/user/get_all_users").get(Protect,getAllUserProfile)
router.route("/user/download_resume").get(Protect,downloadProfile)


export default router;