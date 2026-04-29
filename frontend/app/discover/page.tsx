import React, { useState } from "react";
import UserLayout from "../userLayout/page";
import DashboardLayout from "../dashboardLayout/page";
import { clientServer } from "../config/page";
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
          {}
        </div>
      </DashboardLayout>
    </UserLayout>
  );
};

export default Discover;
