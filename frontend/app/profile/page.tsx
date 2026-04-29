"use client"

import React, { useEffect, useState } from 'react'
import { BASE_URL, clientServer } from '../config/page'
import styles from "./page.module.css"
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'
const Profile = () => {
const [profile, setProfile] = useState({});
const [posts,setPosts]= useState([])

const profileFetched = async()=>{
  try{
      const response = await clientServer.get("/get_user_and_Profile");
      setProfile(response.data);
  }catch(err : any){
    alert(err.message)
  }
}

const allPosts = async()=>{
  try{
    const response = await clientServer.get("/posts");

  }catch(err : any){
    alert(err.message)
  }
}
useEffect(()=>{
  profileFetched()
},[])

  return (
      <UserLayout>
        <DashboardLayout>
          <div >
       {profile && profile.userId &&
        <div className={styles.main_container}>

        <div className={styles.backDropContainer}>
          <img src={`${BASE_URL}/${profile.userId.profilePicture}`}  />
        </div>

          <div className={styles.info_Container}>
            <h2>{profile.userId.name}</h2>
            <p>{profile.userId.username}</p>
            <p>{profile.bio}</p>
            <div className={styles.recent_container}>

            </div>
          </div>


        </div>
       }
     </div>
        </DashboardLayout>
      </UserLayout>
  )
}

export default Profile