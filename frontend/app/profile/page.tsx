"use client"

import React, { useState } from 'react'
import { clientServer } from '../config/page'

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

  return (
    <div>Profile</div>
  )
}

export default Profile