"use client";

import React, { useState } from "react";
import { clientServer } from "../config/page";

import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userLoginMethod, setUserLoginMethod] = useState<boolean>(false);
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
      alert("Login Successful");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
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
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
