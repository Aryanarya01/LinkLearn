"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'
import { BASE_URL, clientServer } from '../config/page'
 import styles from "./page.module.css"
import { useUser } from "../context/page";

const Dashboard = () => {
    const route = useRouter()
   useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
        route.push("/login")
    }else{
        getAboutUser();
    }
   },[])
const {user,setUser} = useUser();
const [post,setPosts] = useState([])
const [postContent,setPostContent] = useState("");
const [fileContent,setFileContent] = useState("");

const getAboutUser = async()=>{
        try{
            const response = await clientServer.get("/get_user_and_Profile");
            setUser(response.data)
             
            
        }catch(err : any){
            alert(err.message)
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
<input type="text" />
                </div>

                <div className="Main_Feed_Container">

                </div>
            </div>
        </DashboardLayout>
    </UserLayout>
  )
}

export default Dashboard