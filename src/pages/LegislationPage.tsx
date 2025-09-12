import React from 'react'
import LegislationFeed from '../components/LegislationFeed'

const LegislationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Seguimiento Legislativo</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">
                Rastrea el progreso de leyes y propuestas en el Congreso de Colombia.
                Mantente informado sobre el estado de la legislación que te afecta.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  📊 Esta funcionalidad está en desarrollo. Pronto tendrás acceso completo
                  al seguimiento detallado de toda la actividad legislativa.
                </p>
              </div>
            </div>
          </div>
          <div>
            <LegislationFeed />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegislationPage