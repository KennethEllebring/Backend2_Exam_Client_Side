import CreatePost from '../components/CreatePost';
import GetAllPosts from '../components/GetAllPosts';
import '../styles/Feed.scss';

const Feed = () => {
  return (
    <div>
      <h1>Social media app Feed</h1>
      <CreatePost />
      <GetAllPosts />
    </div>
  );
};

export default Feed;
