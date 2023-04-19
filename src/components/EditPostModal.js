import { useState } from "react";

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

    await fetch("http://localhost:5050/posts", {
      method: "PATCH",
      body: JSON.stringify(editedPost),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    setShowModal(false);
  }

  return (
    <>
      <button onClick={toggleModal}>Edit</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit post</h3>
              <button onClick={toggleModal}>X</button>
            </div>

            <form>
              <input
                type="text"
                placeholder={postBody}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />

              <button onClick={editPost}>Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditPostModal;
