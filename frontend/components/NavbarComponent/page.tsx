import React from 'react'
import styles from "./page.module.css"
const NavbarComponent = () => {
  return (
    <div> 
        <nav className={styles.Navbar}>
          <h2>LinkLearn</h2>

          <div className={styles.authThing}>
            <h3>Profile</h3>
            <h3>Logout</h3>
          </div>
        </nav>
    </div>
  )
}

export default NavbarComponent