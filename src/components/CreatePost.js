import { ApiLink } from "../ApiLink";
import { useState } from "react";
import { toast } from "react-toastify";
import "../styles/CreatePost.scss";

const CreatePost = () => {
  const [body, setBody] = useState("");
  const [requirementsMet, setRequirementsMet] = useState(false);

  const handleCreateNewPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiLink}/posts`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    setRequirementsMet(e.target.form.checkValidity());
    if (e.target.name === "post") {
      setBody(e.target.value);
    }
  };

  return (
    <div className="create-post-wrapper">
      <form className="create-post" onSubmit={handleCreateNewPost}>
        <h2 className="new-post-header">New post</h2>
        <input
          type="text"
          className="create-post-input"
          minLength={1}
          maxLength={1000}
          required
          name="post"
          value={body}
          onChange={handleInputChange}
        />
        <button className="create-post-button" disabled={!requirementsMet}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
