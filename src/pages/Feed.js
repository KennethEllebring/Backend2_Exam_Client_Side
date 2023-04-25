import CreatePost from '../components/CreatePost';
import PostsList from '../components/PostsList';
import Sidebar from '../components/Sidebar';
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
        <Sidebar />
        </div>

        <div className='feed-main-window'>
          <CreatePost />
          <div className='feed-main-window-scroll'>
            <PostsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
