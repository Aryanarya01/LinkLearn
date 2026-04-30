"use client";

import React, { useEffect, useState } from "react";
import { clientServer } from "../config/page";

import { useRouter } from "next/navigation";
import UserLayout from "../userLayout/page";
import { useUser } from "../context/page";
const Login = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLoginMethod, setUserLoginMethod] = useState<boolean>(true);
  const {setUser} = useUser()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      router.push("/dashboard")
    }
  },[])



  const handelRegister = async () => {
    try {
      const response = await clientServer.post("/register", {
        name,
        email,
        username,
        password,
      });
      alert("User Registerd Successfully");
      setUserLoginMethod(true);
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handelLogin = async () => {
    try {
      const response = await clientServer.post("/login", {
        email,
        password,
      });
      const token = response.data.token;

    if (!token) {
      alert("Token not received");
      return;
    }

    // ✅ save token
    localStorage.setItem("token", token);

    // ✅ verify save
    console.log("SAVED TOKEN:", localStorage.getItem("token"));
        setUser(response.data.user)
      alert("Login Successful");
       console.log(response.data);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <UserLayout>
       
         <div>
      <div>
        <div>
          {!userLoginMethod && (
            <div>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Enter UserName"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          )}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              if (userLoginMethod) {
                handelLogin();
              } else {
                handelRegister();
              }
            }}
          >
            {userLoginMethod ? "SignIn" : "SignUp"}
          </button>
        </div>

        <div>{userLoginMethod ? <p>Don't have a account? <button>SignUp</button></p>: <p>Already Have an account? <button>SignIN</button></p>}</div>
      </div>
    </div>
       
    </UserLayout>
  );
};

export default Login;
