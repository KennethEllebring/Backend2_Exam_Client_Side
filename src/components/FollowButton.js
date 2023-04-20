import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';


function FollowButton({ profile }) {

  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async (action, state) => {
    try {
      const response = await fetch(`http://localhost:5050/users/${action}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username: profile.username})
      })
      if(response.ok){
        setIsFollowing(state)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setIsFollowing(profile.followers.includes(user.username))
  }, [])


  if(isFollowing){
    return(
      <button onClick={() => handleFollow('unfollow', false)}>Unfollow</button>
    )
  }

  return (
    <button onClick={() => handleFollow('follow', true)}>Follow</button>
  )
}

export default FollowButton