

import React, { useEffect } from 'react'
import { clientServer } from '../config/page'

const DashboardLayout = ({children}:any) => {
    
    useEffect(()=>{
        getAllProfile()
    },[])

    const getAllProfile = async()=>{
        const response = await clientServer.get("/user/get_all_users");

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

            </div>
        </div>
    </div>
  )
}

export default DashboardLayout