import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';


function FollowButton({ profile }) {

  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false)

  const checkLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users/single/${user.username}`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (data) {
        setIsFollowing(data.following.includes(profile.username))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnfollow = () => {
    console.log('unfollowed')
  }

  const handleFollow = () => {
    console.log('followed')
  }

  useEffect(() => {
    checkLogin()
  }, [])


  if(isFollowing){
    return(
      <button onClick={handleUnfollow}>Unfollow</button>
    )
  }

  return (
    <button onClick={handleFollow}>Follow</button>
  )
}

export default FollowButton