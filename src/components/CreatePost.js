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
    <div className='create-post-wrapper'>
      <form className='create-post' onSubmit={handleCreateNewPost}>
        <h2 className='new-post-header'>New post</h2>
        <input type='text' className='create-post-input' minLength={1} maxLength={1000} required name='post' value={body} onChange={handleInputChange} />
        <button className='create-post-button' disabled={!requirementsMet}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
