import React from 'react'
import CongressLive from '../components/CongressLive'

const CongressPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Congreso en Vivo</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">
                Sigue las sesiones del Congreso en tiempo real. Observa debates,
                votaciones y discusiones de los representantes del pueblo colombiano.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  📺 Esta funcionalidad está en desarrollo. Pronto podrás ver transmisiones
                  en vivo y acceder al archivo completo de sesiones del Congreso.
                </p>
              </div>
            </div>
          </div>
          <div>
            <CongressLive />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CongressPage