import { ApiLink } from "../ApiLink";
import { useEffect, useState } from "react";
import Post from "./Post";
import "../styles/Post.scss";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${ApiLink}/posts/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const flattenedPosts = data.flat();

        const sortedPosts = flattenedPosts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setPosts(sortedPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="post-feed">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostsList;
