

import React, { useEffect, useState } from 'react'
import { clientServer } from '../config/page'

const DashboardLayout = ({children}:any) => {
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
        <div className="container">
            <div className="left_container">
                <h2>Scrool</h2>
                <h2>Discover</h2>
                <h2>My Connection</h2>
            </div>
            <div className="mainContainer">{children}</div>
            <div className="right_container">
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