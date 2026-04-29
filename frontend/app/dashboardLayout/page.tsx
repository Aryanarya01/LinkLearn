
"use client"
import React, { useEffect, useState } from 'react'
import { clientServer } from '../config/page'
import { useRouter } from 'next/navigation'
import styles from "./page.module.css"
const DashboardLayout = ({children}:any) => {
    const router = useRouter()
    const [profiles,setProfiles] = useState([])
    useEffect(()=>{
        getAllProfile()
    },[])

    const getAllProfile = async()=>{
        try{
            const response = await clientServer.get("/user/get_all_users");
            const users = response.data.AllProfile;
        setProfiles(users);
        }catch(err){
            console.log(err);
            
        }
    }



  return (
    <div>
        <div className={styles.container}>
            <div className={styles.left_container}>
                <h2 onClick={()=>{
                    router.push("/dashboard")
                }}>Scrool</h2>
                <h2 onClick={()=>{
                    router.push("/discover")
                }}>Discover</h2>
                <h2 onClick={()=>{
                    router.push("/my_connection")
                }}>My Connection</h2>
            </div>
            <div className={styles.mainContainer}>{children}</div>
            <div className={styles.right_container}>
                <h2>Top Profiles</h2>
                { profiles &&
                     profiles?.map((profile)=>{
                        return(
                            <div key={profile._id}>
                            <p>{profile?.userId?.username}</p>
                            </div>
                        )
                    })
                 }
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout