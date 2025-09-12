import React from 'react'
import LiveNewsFeed from '../components/LiveNewsFeed'

const NewsFeedPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Noticias Políticas</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">
                Mantente informado con las últimas noticias políticas y sociales de Colombia.
                Accede a información verificada y análisis profundos.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  📰 Esta funcionalidad está en desarrollo. Pronto tendrás acceso a un feed
                  completo de noticias verificadas y actualizadas en tiempo real.
                </p>
              </div>
            </div>
          </div>
          <div>
            <LiveNewsFeed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsFeedPage