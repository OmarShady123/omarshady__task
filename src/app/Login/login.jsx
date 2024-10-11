'use client'; // إضافة هذه السطر

import Loading from '../components/Loading';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePosts } from '../fetch/fetch';
import { useTranslations } from 'next-intl';

const Page = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg shadow-md p-6 bg-white hover:bg-gray-50 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
