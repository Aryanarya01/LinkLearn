"use client"

import React from 'react'
import { clientServer } from '../config/page'

const Profile = () => {

const profileFetched = async()=>{
  try{
      const response = await clientServer.get("/get_user_and_Profile");

  }catch(err : any){
    alert(err.message)
  }
}

  return (
    <div>Profile</div>
  )
}

export default Profile