import React from 'react';
import FriendsManager from '../components/social/FriendsManager';

function FriendsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Gestión de Amigos
        </h1>
        <p className="text-gray-600">
          Busca ciudadanos, conecta con personas afines y construye tu red social cívica
        </p>
      </div>
      <FriendsManager />
    </div>
  );
}

export default FriendsPage;