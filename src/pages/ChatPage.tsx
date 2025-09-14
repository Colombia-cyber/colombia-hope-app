import React, { useState } from 'react';
import AuthStatus from '../components/AuthStatus';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  verified?: boolean;
  reactions?: { emoji: string; count: number }[];
}

function ChatPage() {
  const [activeRoom, setActiveRoom] = useState('general');
  const [message, setMessage] = useState('');

  const chatRooms = [
    { id: 'general', name: '🏛️ General', count: 1247, active: true },
    { id: 'legislation', name: '⚖️ Legislativo', count: 856, active: true },
    { id: 'transparency', name: '🔍 Transparencia', count: 643, active: true },
    { id: 'education', name: '🎓 Educación', count: 429, active: false },
    { id: 'security', name: '🛡️ Seguridad', count: 387, active: true },
    { id: 'regional', name: '🗺️ Regional', count: 298, active: false }
  ];

  const messages: ChatMessage[] = [
    {
      id: 1,
      user: 'María González',
      message: '¡Excelente propuesta sobre participación digital! 🇨🇴',
      timestamp: '14:32',
      verified: true,
      reactions: [{ emoji: '👍', count: 15 }, { emoji: '🇨🇴', count: 8 }]
    },
    {
      id: 2,
      user: 'Carlos Ruiz',
      message: 'Creo que deberíamos enfocarnos más en la transparencia de los datos públicos',
      timestamp: '14:35',
      verified: false,
      reactions: [{ emoji: '👍', count: 12 }, { emoji: '🤔', count: 3 }]
    },
    {
      id: 3,
      user: 'Ana Martínez',
      message: '¿Alguien tiene información sobre el proyecto de ley 125?',
      timestamp: '14:38',
      verified: true,
      reactions: [{ emoji: '❓', count: 5 }]
    },
    {
      id: 4,
      user: 'Sistema',
      message: '📢 Recordatorio: El debate sobre participación ciudadana comenzará en 15 minutos en el Senado',
      timestamp: '14:40',
      verified: true,
      reactions: [{ emoji: '📺', count: 23 }]
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-screen max-h-screen">
          {/* Sidebar with Chat Rooms */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              💬 Salas de Chat
            </h2>
            
            {/* User Authentication */}
            <div className="mb-6">
              <AuthStatus />
            </div>

            {/* Chat Rooms */}
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeRoom === room.id
                      ? 'bg-blue-100 border-l-4 border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{room.name}</p>
                      <p className="text-xs text-gray-600">{room.count} participantes</p>
                    </div>
                    {room.active && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Room Guidelines */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 text-sm mb-2">📋 Normas del Chat</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Mantén un lenguaje respetuoso</li>
                <li>• Evita la desinformación</li>
                <li>• Enfócate en el tema de la sala</li>
                <li>• Reporta contenido inapropiado</li>
              </ul>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {chatRooms.find(r => r.id === activeRoom)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {chatRooms.find(r => r.id === activeRoom)?.count} participantes • 
                    <span className="text-green-600 ml-1">En línea</span>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    📹 En vivo
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    📊 Encuesta
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    🚨 Reportar
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-lg ${
                    msg.user === 'Sistema'
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-gray-800">
                        {msg.user}
                      </span>
                      {msg.verified && (
                        <span className="text-blue-600" title="Usuario verificado">✓</span>
                      )}
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">{msg.message}</p>
                  
                  {/* Reactions */}
                  {msg.reactions && (
                    <div className="flex space-x-2">
                      {msg.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full border hover:bg-gray-50 transition text-xs"
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-gray-600">{reaction.count}</span>
                        </button>
                      ))}
                      <button className="text-gray-400 hover:text-gray-600 px-2 py-1 text-xs">
                        + Reaccionar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje... (Mantén el respeto y construye democracia)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Enviar 🇨🇴
                </button>
              </form>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Presiona Enter para enviar • Shift+Enter para nueva línea</span>
                <span>Moderado por IA 🤖 • Datos seguros 🔒</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;