import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const SocialFeed = () => {
  const { isAuthenticated } = useAuth();
  const { notifyPostLiked, notifyCommentAdded } = useSocket();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  const fetchPosts = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: { page: pageNum, limit: 10 }
      });

      const { posts: newPosts, pagination } = response.data;
      
      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }

      setHasMore(pagination.page < pagination.pages);
      setPage(pageNum);
    } catch (error) {
      setError('Error al cargar los posts');
      console.error('Fetch posts error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(page + 1);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/like`);
      const { isLiked, likesCount } = response.data;

      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isLiked, _count: { ...post._count, likes: likesCount } }
          : post
      ));

      // Find the post to get author info for notification
      const post = posts.find(p => p.id === postId);
      if (post && isLiked) {
        notifyPostLiked(postId, post.author.id);
      }
    } catch (error) {
      console.error('Like post error:', error);
    }
  };

  const handleComment = async (postId, content) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, {
        content
      });

      const newComment = response.data.comment;

      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...(post.comments || []), newComment],
              _count: { ...post._count, comments: post._count.comments + 1 }
            }
          : post
      ));

      // Notify post author
      const post = posts.find(p => p.id === postId);
      if (post) {
        notifyCommentAdded(postId, post.author.id, newComment);
      }

      return newComment;
    } catch (error) {
      console.error('Comment error:', error);
      throw error;
    }
  };

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {isAuthenticated && (
        <CreatePost onPostCreated={handlePostCreated} />
      )}

      <div className="space-y-6">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && hasMore && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cargar más posts
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No hay posts aún
          </h3>
          <p className="text-gray-600">
            {isAuthenticated 
              ? '¡Sé el primero en compartir algo!' 
              : 'Inicia sesión para ver y crear posts'
            }
          </p>
        </div>
      )}

      {!loading && !hasMore && posts.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          Has visto todos los posts disponibles
        </div>
      )}
    </div>
  );
};

export default SocialFeed;