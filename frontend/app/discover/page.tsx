 "use client"
import UserLayout from "../userLayout/page";
import DashboardLayout from "../dashboardLayout/page";
import { BASE_URL, clientServer } from "../config/page";
import { useEffect, useState } from "react";
 import styles from "./page.module.css"
import { useRouter } from "next/navigation";
const Discover = () => {


    const [profiles, setProfiles] = useState([]);

  const router = useRouter()
    
    
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
                    <div onClick={()=>{
                        router.push(`view_profile/${profile.userId.username}`)
                    }} className={styles.Profile} key={profile._id}>
                        <img src={`${BASE_URL}/${profile.userId?.profilePicture}`} alt="" />
                        <h3>{profile.userId?.name}</h3>

                        <p>{profile.userId?.username}</p>
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
