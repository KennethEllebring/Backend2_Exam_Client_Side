import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import Post from "../components/Post";
import FollowButton from "../components/FollowButton";

const Profile = () => {

  const { username } = useParams()
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [followingCount, setFollowingCount] = useState(null)
  
  const getUser = async () => {
    try {
      const postPromise = fetch(`http://localhost:5050/posts/all/user/${username}`, {credentials: 'include'})
      const userPromise = fetch(`http://localhost:5050/users/single/${username}`, {credentials: 'include'})

      const results = await Promise.all([postPromise, userPromise])
      const postData = await results[0].json()
      const userData = await results[1].json()
      if(userData.message === 'User not found'){
        setUser(null)
        throw new Error(userData.message)
      }
      if(postData.message === 'No posts were found') {
        throw new Error(postData.message)
      }
      const flattenedPosts = postData.flat();
      const sortedPosts = flattenedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sortedPosts)
      setUser(userData)
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

  if(loading) return null

  if (user === null) {
    return (
      <div>
        <Link to="../feed">Back to feed</Link>
        <h1>Profile not found</h1>
      </div>
    )
  } return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px', maxWidth: '90%', border: '1px solid red', alignItems: 'center' }}>
      <Link to="../feed">Back to feed</Link>
      <div className="profile-header">
        <h1>@{username}</h1>
        <FollowButton user={user}/>
        <p>Following: {user.following ? user.following.length : 0}</p>
      </div>
      {posts.length ? renderedPosts : <p>This user has no posts yet</p>}
    </div>
  )

};

export default Profile;