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

  function deletePost(postID) {
    console.log("Delete");
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
                deletePost();
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
