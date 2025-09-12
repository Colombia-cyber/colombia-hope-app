import React from 'react'

const AnalyticsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Análisis y Métricas</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Explora análisis detallados sobre tendencias políticas, opinión pública y 
            participación ciudadana en Colombia.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              📈 Esta funcionalidad está en desarrollo. Pronto podrás acceder a dashboards
              interactivos con análisis de datos y tendencias políticas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage