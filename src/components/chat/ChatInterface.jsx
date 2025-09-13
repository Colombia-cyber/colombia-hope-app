import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const ChatInterface = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    socket, 
    isConnected, 
    sendMessage, 
    startTyping, 
    stopTyping, 
    isUserOnline 
  } = useSocket();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load friends list
  useEffect(() => {
    if (isAuthenticated) {
      loadFriends();
    }
  }, [isAuthenticated]);

  // Socket event listeners
  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (messageData) => {
        setMessages(prev => [...prev, messageData]);
      });

      socket.on('message_sent', (messageData) => {
        setMessages(prev => [...prev, messageData]);
      });

      socket.on('user_typing', (data) => {
        setTypingUsers(prev => new Set([...prev, data.userId]));
      });

      socket.on('user_stopped_typing', (data) => {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
      });

      return () => {
        socket.off('receive_message');
        socket.off('message_sent');
        socket.off('user_typing');
        socket.off('user_stopped_typing');
      };
    }
  }, [socket]);

  const loadFriends = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/friends`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFriends(data.friends);
      }
    } catch (error) {
      console.error('Load friends error:', error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedFriend || !isConnected) return;

    sendMessage(selectedFriend.id, newMessage.trim());
    setNewMessage('');
    
    // Stop typing indicator
    stopTyping(selectedFriend.id);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!selectedFriend || !isConnected) return;

    // Start typing indicator
    startTyping(selectedFriend.id);
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing indicator after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping(selectedFriend.id);
    }, 2000);
  };

  const selectFriend = (friend) => {
    setSelectedFriend(friend);
    setMessages([]); // Clear messages (in a real app, you'd load chat history)
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Chat Ciudadano
            </h3>
            <p className="text-gray-600">
              Inicia sesión para chatear con otros ciudadanos
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Friends Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
          <div className="flex items-center mt-2">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {friends.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No tienes amigos para chatear.</p>
              <p className="text-sm mt-1">Busca usuarios en la sección de amigos.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {friends.map(friend => (
                <button
                  key={friend.id}
                  onClick={() => selectFriend(friend)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedFriend?.id === friend.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {friend.avatar ? (
                        <img 
                          src={friend.avatar} 
                          alt={friend.displayName || friend.username}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {(friend.displayName || friend.username).charAt(0).toUpperCase()}
                        </div>
                      )}
                      {isUserOnline(friend.id) && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {friend.displayName || friend.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {isUserOnline(friend.id) ? 'En línea' : 'Desconectado'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {selectedFriend.avatar ? (
                    <img 
                      src={selectedFriend.avatar} 
                      alt={selectedFriend.displayName || selectedFriend.username}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {(selectedFriend.displayName || selectedFriend.username).charAt(0).toUpperCase()}
                    </div>
                  )}
                  {isUserOnline(selectedFriend.id) && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {selectedFriend.displayName || selectedFriend.username}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isUserOnline(selectedFriend.id) ? 'En línea' : 'Desconectado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user?.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {typingUsers.has(selectedFriend.id) && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleTyping}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!isConnected}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || !isConnected}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Selecciona un amigo para chatear
              </h3>
              <p className="text-gray-600">
                Elige una conversación del panel izquierdo para empezar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;