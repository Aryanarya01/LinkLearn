

import React from 'react'

const DashboardLayout = ({children}:any) => {
  return (
    <div>
        <div className="container">
            <div className="left_container">
                <h2>Scrool</h2>
                <h2>Discover</h2>
                <h2>My Connection</h2>
            </div>
            <div className="mainContainer">{children}</div>
            <div className="right_container">
                <h2>Top connection</h2>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout