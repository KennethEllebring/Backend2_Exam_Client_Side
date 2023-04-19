import React, {useState} from 'react';
import '../styles/Post.scss';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeletePostComp from './DeletePostComp';
import {useAuth} from '../context/AuthContext';
import EditPostModal from './EditPostModal';

function Post({post}) {
  const {body, comments, date, like, userID, _id} = post;
  const {user} = useAuth();
  const commentCount = comments.length;
  const likeCount = like.length;

  return (
    <div className='post-card'>
      <div className='post-header'>
        <Link className='post-title' to={`../profile/${userID}`}>
          @{userID}
        </Link>
        {userID === user.username ? (
          <div>
            <DeletePostComp className='delete-button' id={_id} />
            <EditPostModal post={post}/>
          </div>
        ) : null}
      </div>

      <p className='post-body'>{body}</p>

      <div className='post-stats'>
        <p className='like-count'>{likeCount} likes</p>
        <p className='comment-count'>{commentCount} comments</p>
      </div>
      <div className='post-buttons'>
        <LikeButton className='like-button' id={_id} post={[post, user]} />
        <CommentButton className='comment-button' post={post} />
      </div>
      <div className='comment-section' style={{display: 'none'}}>
        {/* map through comments and render them here ? */}
      </div>
    </div>
  );
}

export default Post;
