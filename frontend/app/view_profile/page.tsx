import React from 'react'
import UserLayout from '../userLayout/page'

const viewProfile = () => {
  return (
    <UserLayout>
        <DashboardLayout>
          <div >
       {profile && profile.userId &&
        <div className={styles.main_container}>

        <div className={styles.backDropContainer}>
          <img src={`${BASE_URL}/${profile.userId.profilePicture}`}  />
        </div>

          <div className={styles.info_Container}>
            <h2>{profile.userId.name}</h2>
            <p>{profile.userId.username}</p>
            <p>{profile.bio}</p>
            <div className={styles.recent_container}>
              <h2>Recent Activity</h2>
                {posts.length > 0 ? 
                  posts.map((post)=>{
                    return(
                      <div  key={post._id}>
                        <img src={`${BASE_URL}/${post?.media}`} />
                        <p>{post.body}</p>
                      </div>
                    )
                  })
                  : <p>No Posts</p>
                }
            </div>



            <div className={styles.Work_section}>
              <h2>Work History</h2>
              { 
                profile.pastWork.map((work)=>{
                  return (
                    <div key={work._id}>
                      <p> {work.company}--
                      {work.position}</p>
                      <p>{work.years}</p>

                    </div>
                  )
                })
              }
            </div>

                <div className={styles.Education_section}>
                  <h2>Education</h2>
                  {
                    profile.education.map((edu)=>{
                      return(
                        <div key={edu._id}>
                          <p>{edu.school}--{edu.degree}</p>
                          <p>{edu.fieldOfStudy}</p>
                        </div>
                      )
                    })
                  }
                </div>



          </div>


        </div>
       }
     </div>
        </DashboardLayout>
      </UserLayout>
  )
}

export default viewProfile