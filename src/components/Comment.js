import {ApiLink} from '../ApiLink';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import '../styles/Post.scss';

function Comment({post}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState('');
  const [requirementsMet, setRequirementsMet] = useState(false);
  const navigate = useNavigate();

  const handleCommentClick = () => {
    setIsModalOpen(true);
    const flattenedComments = post.comments.flat();
    const sortedComments = flattenedComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    setComments(sortedComments);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setRequirementsMet(e.target.form.checkValidity());
    if (e.target.name === 'comment') {
      setNewCommentBody(e.target.value);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const newComment = {id: post._id, commentBody: newCommentBody};

    try {
      const response = await fetch(`${ApiLink}/posts/post/`, {
        method: 'PATCH',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      toast.success(data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button className='main-button' onClick={handleCommentClick}>
        Comment
      </button>

      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button className='modal-close-button' onClick={handleModalClose}>
              X
            </button>
            <h4 className='user-post-name'>@{post.userID}</h4>
            <p className='user-post-body'>{post.body}</p>
            <div className='post-stats'>
              <p className='like-count'>{post.like.length === 1 ? `${post.like.length} like` : `${post.like.length} likes`}</p>
              <p className='comment-count'>{post.comments.length === 1 ? `${post.comments.length} comment` : `${post.comments.length} comments`}</p>
            </div>
            <div className='comment-card-wrapper'>
              {comments.map((comment, key) => (
                <div className='comment-card' key={key}>
                  <h4 className='comment-user-name'>@{comment.userID}</h4>
                  <p className='comment-body'>{comment.comment}</p>
                  <p className='comment-date'>{comment.date}</p>
                </div>
              ))}
            </div>
            <form className='new-comment' onSubmit={handleCommentSubmit}>
              <input className='new-comment-input' minLength={1} required name='comment' value={newCommentBody} onChange={handleInputChange} />
              <button className='new-comment-button' disabled={!requirementsMet}>
                Comment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
