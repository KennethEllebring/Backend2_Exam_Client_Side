import React, {useState} from 'react';
import {toast} from 'react-toastify';

function Comment({post}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState('');
  const [requirementsMet, setRequirementsMet] = useState(false);

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
      const response = await fetch('http://localhost:5050/posts/post/', {
        method: 'PATCH',
        body: JSON.stringify(newComment),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button className='comment-button' onClick={handleCommentClick}>
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
              <p className='like-count'>&#128077; {post.like.length}</p>
              <p className='comment-count'>{post.comments.length} comments</p>
            </div>
            <h3 className='comment-header'>Comments</h3>
            {comments.map((comment, key) => (
              <div className='comment-card' key={key}>
                <h4 className='comment-user-name'>@{comment.userID}</h4>
                <h6 className='comment-date'>{comment.date}</h6>
                <p className='comment-body'>{comment.comment}</p>
              </div>
            ))}

            <form className='new-comment' onSubmit={handleCommentSubmit}>
              <input className='new-comment-input' minLength={1} required name='comment' value={newCommentBody} onChange={handleInputChange} placeholder='Type your comment...' />
              <button className='new-comment-button' disabled={!requirementsMet}>
                comment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
