import React from 'react'

function FollowButton({ user }) {

  return (
    <button onClick={() => console.log(user)}>
      Follow
    </button>
  )
}

export default FollowButton