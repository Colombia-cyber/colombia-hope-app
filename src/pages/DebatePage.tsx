import React from 'react'

const DebatePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debates Ciudadanos</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Participa en debates estructurados sobre políticas públicas, reformas y decisiones
            que afectan el futuro de Colombia.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800">
              🗣️ Esta funcionalidad está en desarrollo. Pronto podrás participar en debates
              organizados y moderados sobre temas de interés nacional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebatePage