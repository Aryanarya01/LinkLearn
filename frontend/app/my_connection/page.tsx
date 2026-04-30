"use client"
import React, { useEffect, useState } from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'
import { BASE_URL, clientServer } from '../config/page'

const page = () => {

    const [myConnections,setMyConnections] = useState([]);


    const whatAreMyConnections = async()=>{
        try{
            const response = await clientServer.get("/user/what_are_my_connection");
            setMyConnections(response.data.myConnection)
        }catch(err : any){
            alert(err.message)
        }
    }

    useEffect(()=>{
        whatAreMyConnections()
    },[])
  return (
     <UserLayout>
        <DashboardLayout>
            <div>
                <h2>My Connections</h2>
                <div>
                    <h4>My Network</h4>

                {myConnections ? 
                    <div>
                        <img src={`${BASE_URL}/${myConnections.userId?.profilePicture}`} />
                        <h3>{myConnections.userId?.name}</h3>
                    </div>
                : <h2>No Connection</h2>}

                </div>
                
            </div>
        </DashboardLayout>
     </UserLayout>
  )
}

export default page