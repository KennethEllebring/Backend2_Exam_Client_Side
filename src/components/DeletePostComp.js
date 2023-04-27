import {ApiLink} from '../ApiLink';
import React from 'react';
import '../styles/Post.scss';
import {useNavigate} from 'react-router-dom';

async function DeletePost(id) {
  const navigate = useNavigate();

  const confirmBox = window.confirm('Do you Want To Remove Post');
  if (confirmBox) {
    await fetch(`${ApiLink}/posts`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    navigate('/');
  }
}

function DeletePostComp(params) {
  return (
    <button
      className='delete-button'
      onClick={() => {
        DeletePost(params.id);
      }}>
      Delete
    </button>
  );
}

export default DeletePostComp;
