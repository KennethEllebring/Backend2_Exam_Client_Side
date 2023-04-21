import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import Post from "../components/Post";
import FollowButton from "../components/FollowButton";
import { useAuth } from '../context/AuthContext';

const Profile = () => {

  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const authContext = useAuth();

  const getUser = async () => {
    try {
      const postPromise = fetch(`http://localhost:5050/posts/all/user/${username}`, { credentials: 'include' })
      const userPromise = fetch(`http://localhost:5050/users/single/${username}`, { credentials: 'include' })

      const results = await Promise.all([postPromise, userPromise])
      const postData = await results[0].json()
      const userData = await results[1].json()
      if (userData.message === 'User not found') {
        setUser(null)
      } else {
        setUser(userData)
      }
      const flattenedPosts = postData.flat();
      const sortedPosts = flattenedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sortedPosts)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }


  useEffect(() => {
    getUser()
  }, [])


  const renderedPosts = posts.map((post) => {
    return <Post key={post._id} post={post} />
  })

  if (loading) return null

  if (user === null) {
    return (
      <div>
        <Link to="../feed">Back to feed</Link>
        <h1>Profile not found</h1>
      </div>
    )
  } console.log(user)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px', maxWidth: '90%', border: '1px solid red', alignItems: 'center' }}>
      <Link to="../feed">Back to feed</Link>
      <div className="profile-header">
        <h1>@{username}</h1>
        {authContext.user.username !== user.username ? <FollowButton profile={user} /> : null}
        <p>Following:  {user.following.length - 1}</p>
        <p>Followers:  {user.followers.length - 1}</p>


      </div>
      {posts.length ? renderedPosts : <p>This user has no posts yet</p>}
    </div>
  )

};

export default Profile;