"use client"

import React, { useEffect, useState } from 'react'
import { clientServer } from '../config/page'
import styles from "./page.module.css"
const Profile = () => {
const [profile, setProfile] = useState("")
const profileFetched = async()=>{
  try{
      const response = await clientServer.get("/get_user_and_Profile");
      setProfile(response.data.userProfile);
  }catch(err : any){
    alert(err.message)
  }
}
useEffect(()=>{
  profileFetched()
},[])

  return (
    <div className={styles.main_container}>

    </div>
  )
}

export default Profile