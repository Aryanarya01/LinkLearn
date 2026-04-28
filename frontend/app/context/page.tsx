"use client";
import { createContext, useContext, useState } from "react";


const UserContext = createContext<any>(null);


export const UserProvider = ({children} :any)=>{
    
    const [user,setUser] = useState<any>(null)
    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = ()=>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUser must be inside UserPrvider")
    }
    return context
}