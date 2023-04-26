import { ApiLink } from "../ApiLink";
import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostsList";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "../styles/Feed.scss";
import "../styles/Popup_modal.scss";
import "../styles/Profile.scss";

const Feed = () => {
  //Tillfällig logout knapp och namnbricka
  const { setLoggedIn, setUser, user } = useAuth();
  const handleLogout = async () => {
    try {
      const res = await fetch(`${ApiLink}/auth/logout`, {
        credentials: "include",
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
    <div className="profile-main-container">
      <h1 className="site-header">
        <Link to="../feed" className="header-link">
          PenFriend
        </Link>
      </h1>

      <aside className="aside">
        <Sidebar />
      </aside>

      <div className="profile-wrapper">
        <div className="profile-header">
          <CreatePost />
        </div>
        <div className="post-container">
          <PostsList />
        </div>
      </div>
      <div className="filler-div"></div>
    </div>
  );
};

export default Feed;
