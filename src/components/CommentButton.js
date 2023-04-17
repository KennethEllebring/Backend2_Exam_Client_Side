import React from 'react'

function CommentButton({ post }) {
  return (
    <button onClick={() => console.log("ouch")}>
      Comment
    </button>
  )
}

export default CommentButton