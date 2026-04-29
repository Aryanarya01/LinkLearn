import React, { useState } from "react";
import UserLayout from "../userLayout/page";
import DashboardLayout from "../dashboardLayout/page";
import { clientServer } from "../config/page";
import { profile } from "console";
const [profiles, setProfiles] = useState([]);
const Discover = () => {
  const getAllProfile = async () => {
    try {
      const response = await clientServer.get("/user/get_all_users");
      const users = response.data.AllProfile;
      setProfiles(users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Discover</h1>
          {profiles && 
            profiles.map((profile)=>{
                return(
                    <div key={profile._id}>
                        
                    </div>
                )
            })
          }
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default Discover;
