import {useState} from 'react';
import {toast} from 'react-toastify';
import '../styles/Feed.scss';

const CreatePost = () => {
  // new post states
  const [body, setBody] = useState('');
  const [requirementsMet, setRequirementsMet] = useState(false);
  // Create new Post
  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/posts', {
        method: 'POST',
        body: JSON.stringify({body}),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }); // change to correct endpoint
      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Create new post handler, so you can't click post if empty
  const handleInputChange = (e) => {
    setRequirementsMet(e.target.form.checkValidity());
    if (e.target.name === 'post') {
      setBody(e.target.value);
    }
  };

  return (
    <form className='new-post' onSubmit={handleCreateNewPost}>
      <h3>New post</h3>
      <input type='text' minLength={1} maxLength={1000} required name='post' value={body} onChange={handleInputChange} />
      <button className='post-button' disabled={!requirementsMet}>
        Post
      </button>
    </form>
  );
};

export default CreatePost;
