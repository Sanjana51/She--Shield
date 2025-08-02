import React, { useState } from 'react';

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: postId,
        content,
        username: 'Anonymous' // You can make this dynamic later
      })
    });

    if (res.ok) {
      setContent('');
      if (onCommentAdded) onCommentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        type="text"
        placeholder="Write a comment..."
        className="border w-full p-2 mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="bg-pink-500 text-white px-3 py-1 rounded text-sm">
        Post Comment
      </button>
    </form>
  );
}
