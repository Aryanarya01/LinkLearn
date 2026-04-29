import React from 'react'
import UserLayout from '../userLayout/page'
import DashboardLayout from '../dashboardLayout/page'

const page = () => {
  return (
     <UserLayout>
        <DashboardLayout>
            <div>
                <h2>My Connections</h2>
            </div>
        </DashboardLayout>
     </UserLayout>
  )
}

export default page