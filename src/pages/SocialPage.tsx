import React from 'react';
import SocialFeed from '../components/social/SocialFeed';

function SocialPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Red Social Ciudadana
          </h1>
          <p className="text-gray-600">
            Conecta con otros ciudadanos, comparte ideas y participa en el diálogo cívico
          </p>
        </div>
        <SocialFeed />
      </div>
    </div>
  );
}

export default SocialPage;