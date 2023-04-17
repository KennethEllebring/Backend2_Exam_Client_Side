async function DeletePostComp(id) {
  const confirmBox = window.confirm("Do you Want To Remove Post");
  if (confirmBox) {
    await fetch("http://localhost:5050/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    window.location.reload();
  }
}

export default DeletePostComp;
