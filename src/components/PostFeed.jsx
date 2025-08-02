import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 pt-6">
      <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">🌸 Women's Community</h2>

      <div className="flex flex-col items-center gap-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md border border-pink-100 w-[350px] sm:w-[400px]"
            >
              <img
                src={`http://localhost:5000${post.image_url}`}
                alt="User post"
                className="w-full h-[350px] object-cover rounded-t-xl"
              />

              <div className="p-3">
                <p className="text-gray-800 text-sm mb-1">{post.caption}</p>

                <div className="text-xs text-pink-500 font-medium mb-2">
                  #womenempowerment
                </div>

                <CommentForm postId={post.id} onCommentAdded={fetchPosts} />
                <CommentSection postId={post.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


