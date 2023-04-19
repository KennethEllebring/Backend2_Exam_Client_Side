import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import Post from "../components/Post";

const Profile = () => {

  const { username } = useParams()
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5050/posts/all/user/${username}`, {
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user posts')
      }

      const data = await response.json()
      const flattenedPosts = data.flat();
      const sortedPosts = flattenedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      setUserPosts(sortedPosts)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }


  useEffect(() => {
    getUser()
  }, [])

  const renderedPosts = userPosts.map((post) => {
    return <Post key={post._id} post={post} />
  })

  if (loading) return null

  if (userPosts.length === 0) {
    return (
      <div>
        <Link to="../feed">Back to feed</Link>
        <h1>Profile not found</h1>
      </div>
    )
  } return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px', maxWidth: '90%', border: '1px solid red', alignItems: 'center' }}>
      <Link to="../feed">Back to feed</Link>
      <h1>@{username}</h1>
      {renderedPosts}
    </div>
  )

};

export default Profile;