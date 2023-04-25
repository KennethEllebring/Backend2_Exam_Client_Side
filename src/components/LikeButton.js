import { ApiLink } from "../ApiLink";
import { toast } from "react-toastify";
import "../styles/Post.scss";

async function likePost(id) {
  try {
    const response = await fetch(`${ApiLink}/posts/like`, {
      method: "PATCH",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    toast.success(data.message);
    window.location.reload();
  } catch (error) {
    toast.error(error.message);
  }
}

function LikeButton({ post }) {
  return post[0].like.includes(post[1].username) ? (
    <button
      className="like-button main-button"
      onClick={() => likePost(post[0]._id)}
    >
      Unlike
    </button>
  ) : (
    <button
      className="like-button main-button"
      onClick={() => likePost(post[0]._id)}
    >
      Like
    </button>
  );
}

export default LikeButton;
