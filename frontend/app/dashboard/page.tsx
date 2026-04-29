"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserLayout from "../userLayout/page";
import DashboardLayout from "../dashboardLayout/page";
import { BASE_URL, clientServer } from "../config/page";
import styles from "./page.module.css";
import { useUser } from "../context/page";

const Dashboard = () => {
  const route = useRouter();
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState<File | null>(null);
  const [comments,setComments] = useState([]);
  const [isModalOpen,setIsModelOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedPostId,setSelectedPostId] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      route.push("/login");
    } else {
      getAboutUser();
    }
  }, []);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAboutUser = async () => {
    try {
      const response = await clientServer.get("/get_user_and_Profile");
      setUser(response.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getAllPost = async () => {
    try {
      const response = await clientServer.get("/posts");
      setPosts(response.data.posts);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const createPost = async () => {
    try {
      const formData = new FormData();
      formData.append("body", postContent);
      if (fileContent) {
        formData.append("media", fileContent);
      }

      const response = await clientServer.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      alert("post created");
      setPostContent("");
      setFileContent(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (post_id: string) => {
    try {
      const response = await clientServer.delete("/delete_post", {
        data: { post_id },
      });
      getAllPost();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getAllComment = async(post_id : string)=>{
    try{  
      const response = await clientServer.get("get_comment_by_post",{
        params : {
          postId : post_id
        } 
      });
      setComments(response.data.comments)

    }catch(err:any){
      alert(err.message)
    }
  }

  const commentPost = async ()=>{
    try{ 
      const response = await clientServer.post("/comment_post",{
        data : {
          postId : post
        }
      })
    }catch(err:any){
      alert(err.message);
    }
  }

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.FeedContainer}>
          <div className={styles.searchBox}>
            {user && user.userId && (
              <img src={`${BASE_URL}/${user.userId.profilePicture}`} />
            )}
            <textarea
              value={postContent}
              placeholder={"What's in your mind..."}
              onChange={(e) => {
                setPostContent(e.target.value);
              }}
            ></textarea>

            <label htmlFor="fileUpload">
              <div>Select</div>
            </label>
            <input
              type="file"
              hidden
              id="fileUpload"
              onChange={(e) => setFileContent(e.target.files?.[0] || null)}
            />
            <button
              onClick={() => {
                createPost();
              }}
            >
              Post
            </button>
          </div>

          <div className="Main_Feed_Container">
            {posts.length > 0 ? (
              posts.map((post) => {
                return (
                  <div key={post._id}>
                    <button
                      onClick={() => {
                        deletePost(post._id);
                      }}
                    >
                      Delete
                    </button>
                    <img
                      className={styles.postIMage}
                      src={`${BASE_URL}/${post.media}`}
                      alt=""
                    />
                    <p onClick={()=>{
                      setIsModelOpen(true)
                      getAllComment(post._id)
                    }} >comment</p>
                     {isModalOpen && (
                      <div>
                            {comments.length > 0 && (
                              comments.map((comment)=>{
                                return(
                                  <p>{comment.body}</p>
                                )
                              })
                            )}
                      </div>
                     )}
                    <h2>{post.body}</h2>
                  </div>
                );
              })
            ) : (
              <p>No posts</p>
            )}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default Dashboard;
