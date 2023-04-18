import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostsList';
import SearchUser from '../components/SearchUser';
import { useAuth } from '../context/AuthContext';
import '../styles/Feed.scss';



const Feed = () => {

  //Tillfällig logout knapp och namnbricka
  const { setLoggedIn, setUser, user } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5050/auth/logout', {
        credentials: 'include',
      });
      if (res.ok) {
        setLoggedIn(false);
        setUser(null)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>Logged in as: {user.username}</p>
      <h1>Social media app Feed</h1>
      <SearchUser />
      <CreatePost />
      <PostsList />
    </div>
  );
};

export default Feed;
