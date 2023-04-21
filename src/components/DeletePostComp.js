import React from "react";
import '../styles/Post.scss';

async function DeletePost(id) {
  const confirmBox = window.confirm("Do you Want To Remove Post");
  if (confirmBox) {
    await fetch("http://localhost:5050/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    window.location.reload();
  }
}

function DeletePostComp(params) {
  return (
    <button
      className='delete-button'
      onClick={() => {
        DeletePost(params.id);
      }}
    >
      Delete
    </button>
  );
}

export default DeletePostComp;
