"use client";

import NavbarComponent from "@/components/NavbarComponent/page";
import React from "react";

const UserLayout = ({ children }: any) => {
  return (
    <div>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default UserLayout;
