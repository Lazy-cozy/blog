import React from "react";

const CommentList = ({ comments }) => {
  return (
    <>
      <h3 className="sm:text-2xl text-xl font-bold my-6 text-gray-900">
        Comments :
      </h3>
      {comments.length === 0 ? (
        <p className="text-gray-700">No comments available.</p>
      ) : (
        comments.map((item,index) => (
          <div key={index}>
            <h4 className="text-xl font-bold">{item.username}</h4>
            <p className="mt-1 mb-4">{item.comment}</p>
          </div>
        ))
      )}
    </>
  );
};

export default CommentList;
