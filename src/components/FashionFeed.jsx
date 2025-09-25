import React, { useEffect, useState } from "react";
import axios from "axios";

const FashionFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/predict_trends?limit=20"
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching fashion posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading fashion posts...</p>;

  return (
    <div className="w-full p-4 flex justify-center">
      {/* Grid container */}
      <div className="grid gap-6 justify-start" style={{ gridTemplateColumns: "repeat(auto-fill, 300px)" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col justify-between border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-white"
            style={{ width: "300px", height: "200px" }} // fixed size
          >
            <div className="flex flex-col gap-1">
              <div className="font-bold text-gray-800">{post.trend_name}</div>
              <div className="text-gray-700 text-sm truncate">{post.content}</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {post.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {post.predicted_trend_score !== undefined && (
                <div className="text-sm font-semibold text-indigo-600 mt-2">
                  Trend Score: {post.predicted_trend_score.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionFeed;
