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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      route.push("/login");
    } else {
      getAboutUser();
    }
  }, []);
  const { user, setUser } = useUser();
  const [post, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [fileContent, setFileContent] = useState<File | null>(null)

  const getAboutUser = async () => {
    try {
      const response = await clientServer.get("/get_user_and_Profile");
      setUser(response.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const createPost = async ()=>{
    try{
           
        const formData = new FormData();
        formData.append("body",postContent);
       if(fileContent){
         formData.append("media",fileContent)
       }
       
        const response = await clientServer.post("/post",formData,{
          headers: {
    "Content-Type": "multipart/form-data",
  },
        })
        console.log(response);
        
        alert("post created")
        setPostContent("");
        setFileContent(null)
    }catch(err){
        console.log(err);
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

            <label htmlFor="fileUpload"><div>Select</div></label>
            <input type="file" hidden id="fileUpload" onChange={(e)=>setFileContent(e.target.files?.[0] || null)} />
            <button onClick={()=>{
                createPost()
            }}>Post</button>
          </div>

          <div className="Main_Feed_Container"></div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default Dashboard;
