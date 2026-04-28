import { Router } from "express";
 
import multer from "multer";
import { Protect } from "../middleware/protect.js";
import { commentPost, createPost, deletePost, get_comments_by_post, getAllPosts, incrLikes } from "../controllers/post.controllers.js";


const router = Router();
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
router.route("/delete_post").delete(Protect,deletePost);
router.route("/comment_post").post(Protect,commentPost);
router.route("/get_comment_by_post").get(Protect,get_comments_by_post);
router.route("/delete_comment_of_user").delete(Protect,deletePost);
router.route("/increase_like").post(Protect,incrLikes);


export default router;