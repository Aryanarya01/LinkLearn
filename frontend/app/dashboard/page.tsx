"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'
import { BASE_URL, clientServer } from '../config/page'
 

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
const [user,setUser] = useState<any>(null);


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
            <div>
                <div className="searchBox">
                    {user && user.userId && (
  <img src={`${BASE_URL}/${user.userId.profilePicture}`} />
)}
                </div>
            </div>
        </DashboardLayout>
    </UserLayout>
  )
}

export default Dashboard