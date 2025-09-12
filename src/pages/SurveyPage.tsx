import React from 'react'

const SurveyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Encuestas y Opinión</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Participa en encuestas sobre políticas públicas y temas de interés nacional.
            Tu opinión cuenta para construir una Colombia mejor.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              📊 Esta funcionalidad está en desarrollo. Pronto podrás participar en encuestas
              y ver los resultados en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyPage