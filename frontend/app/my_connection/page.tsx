import React from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'

const page = () => {
  return (
     <UserLayout>
        <DashboardLayout>
            <div>
                <h2>My Connections</h2>
                <div>
                    <h4>My Network</h4>
                </div>
                
            </div>
        </DashboardLayout>
     </UserLayout>
  )
}

export default page