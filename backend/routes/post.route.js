import { Router } from "express";
import router from "./user.route";
import multer from "multer";
import { Protect } from "../middleware/protect";
import { createPost, deletePost, getAllPosts } from "../controllers/post.controllers";


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
router.route("/posts").get(Protect,getAllPosts);

router.route("/delete_post").post(Protect,deletePost);


export default router