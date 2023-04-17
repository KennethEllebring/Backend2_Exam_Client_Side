import React, { useState } from "react";
import "../styles/Post.scss";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { useAuth } from "../context/AuthContext";

function Post({ post }) {
  const { body, comments, date, like, userID, _id } = post;
  const { user } = useAuth();
  const commentCount = comments.length;
  const likeCount = like.length;

  async function deletePost(postID) {
    const confirmBox = window.confirm("Do you Want To Remove Post");
    if (confirmBox) {
      console.log("id ->", postID);

      const response = await fetch("http://localhost:5050/posts", {
        method: "DELETE",
        body: JSON.stringify({ id: _id }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
    }
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <Link className="post-title" to={`../profile/${userID}`}>
          @{userID}
        </Link>
        {userID === user.username ? (
          <div>
            <button
              onClick={() => {
                deletePost(_id);
              }}
            >
              Delete
            </button>{" "}
            <button>Edit</button>
          </div>
        ) : null}
      </div>

      <p className="post-body">{body}</p>

      <div className="post-stats">
        <p className="like-count">{likeCount} likes</p>
        <p className="comment-count">{commentCount} comments</p>
      </div>

      <div className="post-buttons">
        <LikeButton className="like-button" post={post} />
        <CommentButton className="comment-button" post={post} />
      </div>

      <div className="comment-section" style={{ display: "none" }}>
        {/* map through comments and render them here ? */}
      </div>
    </div>
  );
}

export default Post;
