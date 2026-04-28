import React, { useState } from 'react'

const Login = () => {

  const [name,setName] = useState<string>("");
  const [username,setUsername] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");

  const handelRegister = async(e:React.FormEvent)=>{
      e.preventDefault();
      try{

      }catch(err : any){
        
      }
  }

  return (
    <div>
      <div>
        <div>
          <input type="text" placeholder='' value={name}  onChange={(e)=>{
            setName(e.target.value)
          }}/>
          <input type="text" placeholder='' value={username}  onChange={(e)=>{
            setUsername(e.target.value)
          }}/>
          <input type="email" placeholder='' value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
          <input type="password" placeholder='' value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
        </div>
      </div>
    </div>
  )
}

export default Login