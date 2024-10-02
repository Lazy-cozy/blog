import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleComment = (event) => {
    event.preventDefault();

    if (username?.trim().length > 0 && commentText.trim().length > 0) {
      saveComment();
    } else {
      console.log("Please fill in all fields.");
    }
  };

  const saveComment = async () => {
    const payload = {
      method: "post",
      body: JSON.stringify({
        username,
        comment: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `/api/article/${articleName}/add-comments`,
      payload
    );

    const data = await response.json();
    setArticleInfo(data);
    setUsername("");
    setCommentText("");
  };

  return (
    <form className="shadow rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900 ">Add a comment</h3>
      <label className="block text-gray-700 text-sm font-bold mb-2 my-2">
        Name :
      </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label className="block text-gray-700 text-sm font-bold mb-2 my-2">
        Comment :
      </label>
      <textarea
        rows={"4"}
        cols={"50"}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="button" // Prevent form submission
        onClick={handleComment}
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Comment
      </button>
    </form>
  );
};

export default AddCommentForm;
