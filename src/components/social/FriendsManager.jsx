import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const FriendsManager = () => {
  const { isAuthenticated } = useAuth();
  const { notifyFriendRequestSent, notifyFriendRequestAccepted, isUserOnline } = useSocket();
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, {
        params: { search: query, limit: 20 }
      });
      setSearchResults(response.data.users);
    } catch (error) {
      console.error('Search users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFriends = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/friends`);
      setFriends(response.data.friends);
    } catch (error) {
      console.error('Load friends error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFriendRequests = async () => {
    setLoading(true);
    try {
      const [receivedResponse, sentResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/friends/requests/received`),
        axios.get(`${API_BASE_URL}/friends/requests/sent`)
      ]);
      setFriendRequests(receivedResponse.data.requests);
      setSentRequests(sentResponse.data.requests);
    } catch (error) {
      console.error('Load friend requests error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'friends') {
        loadFriends();
      } else if (activeTab === 'requests') {
        loadFriendRequests();
      }
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const sendFriendRequest = async (userId) => {
    try {
      await axios.post(`${API_BASE_URL}/friends/request/${userId}`);
      
      // Remove from search results or update status
      setSearchResults(prev => prev.filter(user => user.id !== userId));
      
      // Notify via socket
      notifyFriendRequestSent(userId);
      
      // Refresh sent requests if on that tab
      if (activeTab === 'requests') {
        loadFriendRequests();
      }
    } catch (error) {
      console.error('Send friend request error:', error);
    }
  };

  const respondToFriendRequest = async (requestId, action) => {
    try {
      await axios.put(`${API_BASE_URL}/friends/request/${requestId}`, {
        action
      });

      if (action === 'accept') {
        // Notify via socket
        const request = friendRequests.find(req => req.id === requestId);
        if (request) {
          notifyFriendRequestAccepted(request.sender.id);
        }
      }

      // Refresh data
      loadFriendRequests();
      if (action === 'accept') {
        loadFriends();
      }
    } catch (error) {
      console.error('Respond to friend request error:', error);
    }
  };

  const removeFriend = async (friendshipId) => {
    try {
      await axios.delete(`${API_BASE_URL}/friends/${friendshipId}`);
      loadFriends();
    } catch (error) {
      console.error('Remove friend error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            Gestión de Amigos
          </h3>
          <p className="text-gray-600">
            Inicia sesión para buscar amigos y gestionar tus conexiones
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'search', label: 'Buscar Usuarios', icon: '🔍' },
              { key: 'friends', label: 'Mis Amigos', icon: '👥' },
              { key: 'requests', label: 'Solicitudes', icon: '📥' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.key === 'requests' && friendRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {friendRequests.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search Tab */}
          {activeTab === 'search' && (
            <div>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar usuarios por nombre o usuario..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              <div className="space-y-4">
                {searchResults.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.displayName || user.username} className="w-12 h-12 rounded-full" />
                      ) : (
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {(user.displayName || user.username).charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {user.displayName || user.username}
                          {user.verified && (
                            <svg className="inline w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                        {user.bio && <p className="text-sm text-gray-600 mt-1">{user.bio}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => sendFriendRequest(user.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Enviar Solicitud
                    </button>
                  </div>
                ))}
              </div>

              {!loading && searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron usuarios con "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* Friends Tab */}
          {activeTab === 'friends' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">
                Mis Amigos ({friends.length})
              </h3>

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              <div className="space-y-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {friend.avatar ? (
                          <img src={friend.avatar} alt={friend.displayName || friend.username} className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {(friend.displayName || friend.username).charAt(0).toUpperCase()}
                          </div>
                        )}
                        {isUserOnline(friend.id) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {friend.displayName || friend.username}
                          {friend.verified && (
                            <svg className="inline w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{friend.username}
                          {isUserOnline(friend.id) ? (
                            <span className="ml-2 text-green-600">• En línea</span>
                          ) : (
                            <span className="ml-2 text-gray-400">• Desconectado</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Chatear
                      </button>
                      <button
                        onClick={() => removeFriend(friend.friendshipId)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!loading && friends.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aún no tienes amigos. ¡Usa la búsqueda para encontrar personas!
                </div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              {/* Received Requests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Solicitudes Recibidas ({friendRequests.length})
                </h3>

                {loading && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                )}

                <div className="space-y-4">
                  {friendRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {request.sender.avatar ? (
                          <img src={request.sender.avatar} alt={request.sender.displayName || request.sender.username} className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {(request.sender.displayName || request.sender.username).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {request.sender.displayName || request.sender.username}
                          </h3>
                          <p className="text-sm text-gray-500">@{request.sender.username}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => respondToFriendRequest(request.id, 'accept')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => respondToFriendRequest(request.id, 'reject')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {!loading && friendRequests.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No tienes solicitudes pendientes
                  </div>
                )}
              </div>

              {/* Sent Requests */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Solicitudes Enviadas ({sentRequests.length})
                </h3>

                <div className="space-y-4">
                  {sentRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-3">
                        {request.receiver.avatar ? (
                          <img src={request.receiver.avatar} alt={request.receiver.displayName || request.receiver.username} className="w-12 h-12 rounded-full" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {(request.receiver.displayName || request.receiver.username).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {request.receiver.displayName || request.receiver.username}
                          </h3>
                          <p className="text-sm text-gray-500">@{request.receiver.username}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Pendiente
                      </span>
                    </div>
                  ))}
                </div>

                {!loading && sentRequests.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No has enviado solicitudes pendientes
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsManager;