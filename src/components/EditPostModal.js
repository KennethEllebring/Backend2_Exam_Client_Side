import { ApiLink } from "../ApiLink";
import { useState } from "react";
import "../styles/Post.scss";
import "../styles/Popup_modal.scss";

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);
  const [postBody, setPostBody] = useState(post.body);

  function toggleModal() {
    if (showModal) return setShowModal(false);
    setShowModal(true);
  }

  async function editPost() {
    const editedPost = {
      body: postBody,
      id: post._id,
    };

    await fetch(`${ApiLink}/posts`, {
      method: "PATCH",
      body: JSON.stringify(editedPost),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setShowModal(false);
  }

  return (
    <>
      <button className="main-button" onClick={toggleModal}>
        Edit
      </button>

      {showModal && (
        <div className="modal-edit-overlay">
          <div className="modal-edit-content">
            <button className="modal-edit-close-button" onClick={toggleModal}>
              X
            </button>
            <h2 className="edit-post-header">Edit post</h2>

            <form className="edit-post">
              <textarea
                className="edit-post-input"
                type="text"
                placeholder={postBody}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />

              <button className="edit-post-button" onClick={editPost}>
                Edit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditPostModal;
