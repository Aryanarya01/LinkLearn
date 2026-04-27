import {Router} from "express"
import { acceptConnectionRequest, downloadProfile, getAllUserProfile, getMyConnections, getUserAndProfile, login, register, sendConnectionRequest, updateProfileData, updateUserProfile, uploadUserProfile, whatAreMyConnections } from "../controllers/user.controllers.js";
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
router.route("/user/send_connection_request").post(Protect,sendConnectionRequest)
router.route("/user/get_my_connection").get(Protect,getMyConnections);
router.route("/user/what_are_my_connection").get(Protect,whatAreMyConnections);
router.route("/user/accept_connection").post(Protect,acceptConnectionRequest);

export default router;