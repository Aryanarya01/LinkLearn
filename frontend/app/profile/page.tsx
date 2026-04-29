"use client"

import React, { useEffect, useState } from 'react'
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
useEffect(()=>{
  profileFetched()
},[])

  return (
    <div className={}>

    </div>
  )
}

export default Profile