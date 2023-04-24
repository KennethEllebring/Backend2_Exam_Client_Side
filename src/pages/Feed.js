import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostsList';
import SearchUser from '../components/SearchUser';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import '../styles/Feed.scss';
import '../styles/Popup_modal.scss';

const Feed = () => {
  //Tillfällig logout knapp och namnbricka
  const {setLoggedIn, setUser, user} = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5050/auth/logout', {
        credentials: 'include',
      });
      if (res.ok) {
        setLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className='site-header'>PenFriend</h1>
      <div className='feed-outer-wrapper'>
        <div className='feed-inner-wrapper'>
          <SearchUser />
          <div className='feed-user-info'>
            <Link className='feed-username' to={`../profile/${user.username}`}>
              @{user.username}
            </Link>
            <button className='feed-logout-button' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className='feed-main-window'>
          <CreatePost />
          <PostsList />
        </div>
      </div>
    </>
  );
};

export default Feed;
