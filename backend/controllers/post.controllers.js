import Comment from "../models/comments.model";
import Posts from "../models/posts.model";
import User from "../models/user.model";

export const createPost = async (req, res) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const post = new Posts({
      userId: Id,
      body: req.body.body,
      media: req.file != undefined ? req.file.filename : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });
    await post.save();
    return res.status(200).json({ message: "Post Created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const Id = req.user.id;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const posts = await Posts.find().populate(
      "userId",
      "name username email profilePicture",
    );
    await res.status(200).json({ posts });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const Id = req.user.id;
    const { post_id } = req.body;
    const user = await User.findById(Id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const postToDelete = await Posts.findOne({ _id: post_id });
    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (postToDelete.userId.toString() !== Id) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await postToDelete.findByIdAndDelete(post_id);
    return res.status(200).json({ message: "Post Deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const Id = req.user.id;
    const { post_id, body } = req.body;
    const post = await Posts.findOne({ _id: post_id });
    if (!post) {
      return req.status(404).json({ message: "Post not found!" });
    }
    const newComment = new Comment({
      userId: Id,
      postId: post_id,
      body: body,
    });
    await newComment.save();
    return res.status(200).json({ message: "Comment updated!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const get_comments_by_post = async (req, res) => {
  try {
    const Id = req.user.id;
    const { post_id } = req.body;
    const post = await Posts.findOne({ _id: post_id });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    const comments = await Comment.find({ postId: post_id }).populate(
      "userId",
      "username name",
    );
    return res.status(200).json(comments.reverse());
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const delete_comment_of_user = async(req,res)=>{
  try{

  }catch(err){
    return res.status(500).json({message : err.message})
  }
}