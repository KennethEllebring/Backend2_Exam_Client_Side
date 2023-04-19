import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';


function FollowButton({ profile }) {

  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(null)

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

  const handleUnfollow = async () => {
    try {
      const response = await fetch('http://localhost:5050/users/unfollow', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: profile.username})
      })
      if(response.ok){
        setIsFollowing(false)
        console.log('unfollowed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFollow = async () => {
    try {
      const response = await fetch('http://localhost:5050/users/follow', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: profile.username})
      })
      if(response.ok){
        setIsFollowing(true)
        console.log('followed')
      }
    } catch (error) {
      console.error(error)
    }
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