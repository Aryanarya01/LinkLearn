"use client";

import React, { useState } from 'react'
import { clientServer } from '../config/page';

import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter()
  const [name,setName] = useState<string>("");
  const [username,setUsername] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  const handelRegister = async(e:React.FormEvent)=>{
      e.preventDefault();
      try{
      const response =  await clientServer.post("/register",{
          name,email,username,password
        });
        alert("User Registerd Successfully");
        router.push("/login")

      }catch(err : any){
          alert(err.message)
      }
  }

  const handelLogin = async (e)=>{
    e.preventDefault();
    try{  
      const 
    }catch(err : any){
      alert(err.message);
    }
  }


  return (
    <div>
      <div>
        <div>
          <form onSubmit={handelRegister}>
            <input type="text" placeholder='Enter Name' value={name}  onChange={(e)=>{
              setName(e.target.value)
            }}/>
            <input type="text" placeholder='Enter UserName' value={username}  onChange={(e)=>{
              setUsername(e.target.value)
            }}/>
            <input type="email" placeholder='Enter Email' value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
            <input type="password" placeholder='Enter Password' value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
            <button type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login