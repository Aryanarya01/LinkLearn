"use client"

import React from 'react'
import styles from "./page.module.css"
import { useRouter } from 'next/navigation'
const NavbarComponent = () => {
  const router = useRouter();

  return (
    <div> 
        <nav className={styles.Navbar}>
          <h2>LinkLearn</h2>

          <div className={styles.authThing}>
            <h3 onClick={()=>{
              router.push("/profile")
            }}>Profile</h3>
            <h3>Logout</h3>
          </div>
        </nav>
    </div>
  )
}

export default NavbarComponent