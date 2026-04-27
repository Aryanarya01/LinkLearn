import { Router } from "express";
import router from "./user.route";
import multer from "multer";
import { Protect } from "../middleware/protect";
import { createPost } from "../controllers/post.controllers";


const route = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });

router.route("/post").post(uploads.single("media"),Protect,createPost);


export default router