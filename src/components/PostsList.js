import {useEffect, useState} from 'react';
import Post from './Post'
import '../styles/Post.scss'

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/posts/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        // Flatten the nested arrays
        const flattenedPosts = data.flat();
        // Sort the flattened array by date
        const sortedPosts = flattenedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='post-feed'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post._id} post={post} />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostsList;
