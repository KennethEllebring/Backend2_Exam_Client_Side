import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';


function FollowButton({ profile }) {

  const { user } = useAuth();
  const [userFollowing, setUserFollowing] = useState([])

  const checkLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users/single/${user.username}`, {
        credentials: 'include'
      })
      const data = await response.json()
      if (data) {
        setUserFollowing(data.following)
      }
    } catch (error) {
      console.error(error)
    }

  }


  useEffect(() => {
    checkLogin()
  }, [])



  const isFollowing = userFollowing.includes(profile.username)
  
  console.log(isFollowing)

  return (
    <button>Follow</button>
  )
}

export default FollowButton