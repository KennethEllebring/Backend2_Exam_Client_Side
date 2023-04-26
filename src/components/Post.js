import "../styles/Post.scss";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import DeletePostComp from "./DeletePostComp";
import { useAuth } from "../context/AuthContext";
import EditPostModal from "./EditPostModal";

function Post({ post }) {
  const { body, comments, date, like, userID, _id } = post;
  const { user } = useAuth();
  const commentCount = comments.length;
  const likeCount = like.length;

  return (
    <div className="post-card">
      <div className="post-header">
        <Link className="post-title" to={`../profile/${userID}`}>
          @{userID}
        </Link>
        {userID === user.username ? (
          <div className="header-buttons">
            <EditPostModal className="main-button" post={post} />
            <DeletePostComp className="delete-button" id={_id} />
          </div>
        ) : null}
      </div>

      <p className="post-body">{body}</p>

      <div className="post-stats">
        <p className="like-count">
          {likeCount === 1 ? `${likeCount} like` : `${likeCount} likes`}
        </p>
        <p className="comment-count">
          {commentCount === 1
            ? `${commentCount} comment`
            : `${commentCount} comments`}
        </p>
      </div>
      <div className="post-buttons">
        <LikeButton post={[post, user]} />
        <Comment className="comment-button" post={post} />
      </div>
      <div className="comment-section" style={{ display: "none" }}></div>
    </div>
  );
}

export default Post;
