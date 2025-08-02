import React, { useEffect, useState } from 'react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:5000/comments/${postId}`);
    const data = await res.json();
    setComments(data);
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchComments(); // Refresh comments after deletion
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className="flex justify-between items-center mb-2">
            <p className="text-sm">
              <span className="font-bold">{comment.username}: </span>
              {comment.content}
            </p>
            <button
              className="text-xs text-red-500"
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

