import React from 'react'

const ChatPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chat Ciudadano</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Conecta con otros ciudadanos, comparte tus ideas y participa en debates constructivos
            sobre los temas que más importan a Colombia.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              🚧 Esta funcionalidad está en desarrollo. Pronto podrás chatear con otros ciudadanos
              comprometidos con el futuro de Colombia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage