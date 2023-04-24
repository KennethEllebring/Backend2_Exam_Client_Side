import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import FollowButton from "../components/FollowButton";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.scss";

const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authContext = useAuth();

  const getUser = async () => {
    try {
      const postPromise = fetch(
        `http://localhost:5050/posts/all/user/${username}`,
        { credentials: "include" }
      );
      const userPromise = fetch(
        `http://localhost:5050/users/single/${username}`,
        { credentials: "include" }
      );

      const results = await Promise.all([postPromise, userPromise]);
      const postData = await results[0].json();
      const userData = await results[1].json();
      if (userData.message === "User not found") {
        setUser(null);
      } else {
        setUser(userData);
      }
      const flattenedPosts = postData.flat();
      const sortedPosts = flattenedPosts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderedPosts = posts.map((post) => {
    return <Post key={post._id} post={post} />;
  });

  if (loading) return null;

  if (user === null) {
    return (
      <div>
        <Link to="../feed">Back to feed</Link>
        <h1>Profile not found</h1>
      </div>
    );
  }
  console.log(user);
  return (
    <div className="profile-main-container">
      {/* <h1 className="site-header">PenFriend</h1> */}
      <div className="profile-wrapper">
        <Link to="../feed">Back to feed</Link>
        <div className="profile-header">
          <h1>@{username}</h1>
          {authContext.user.username !== user.username ? (
            <FollowButton profile={user} />
          ) : null}
          {/* 
          <img
            src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
            alt="avatar"
          /> */}
          <div className="profile-info-container">
            <p>Following: {user.following.length - 1}</p>
            <p>Posts: {posts.length}</p>
            <p>Followers: {user.followers.length - 1}</p>
          </div>
        </div>
        {posts.length ? renderedPosts : <p>This user has no posts yet</p>}
      </div>
    </div>
  );
};

export default Profile;
