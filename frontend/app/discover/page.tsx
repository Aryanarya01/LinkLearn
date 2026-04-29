 "use client"
import UserLayout from "../userLayout/page";
import DashboardLayout from "../dashboardLayout/page";
import { BASE_URL, clientServer } from "../config/page";
import { useEffect, useState } from "react";
 
const Discover = () => {


    const [profiles, setProfiles] = useState([]);


    
    
  const getAllProfile = async () => {
    try {
      const response = await clientServer.get("/user/get_all_users");
      const users = response.data.AllProfile;
      setProfiles(users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getAllProfile()
  },[])
  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Discover</h1>
          {profiles && 
            profiles.map((profile)=>{
                return(
                    <div className={sty} key={profile._id}>
                        <img src={`${BASE_URL}/${profile.userId?.profilePicture}`} alt="" />
                        <h3>{profile.userId?.name}</h3>
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
