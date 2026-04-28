import React, { useEffect } from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'
import { BASE_URL } from '../config/page'

const Dashboard = () => {
    
   useEffect(()=>{
    if(!localStorage.getItem("token")){
        route
    }
   })
  return (
    <UserLayout>
        <DashboardLayout>
            <div>
                <div className="searchBox">
                    <img src={`${BASE_URL}/${}`}/>
                </div>
            </div>
        </DashboardLayout>
    </UserLayout>
  )
}

export default Dashboard