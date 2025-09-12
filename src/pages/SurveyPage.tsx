export default function SurveyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Encuestas Ciudadanas</h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Participa en encuestas sobre temas de interés público. Tu opinión es fundamental 
            para entender las necesidades y expectativas de la comunidad.
          </p>
          <div className="bg-green-100 border-l-4 border-green-500 p-4">
            <p className="text-green-700">
              <strong>Próximamente:</strong> Sistema de encuestas interactivas con resultados 
              en tiempo real y análisis demográfico.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-blue-900">
                Prioridades de Inversión Pública
              </h3>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Activa
              </span>
            </div>
            <p className="text-blue-700 mb-4">
              ¿En qué áreas crees que el gobierno debería invertir más recursos?
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">⏱️ 3 días restantes</span>
              <span className="text-blue-600">✅ 2,456 respuestas</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-900">
                Calidad de Servicios Públicos
              </h3>
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                Activa
              </span>
            </div>
            <p className="text-purple-700 mb-4">
              Evalúa la calidad de los servicios públicos en tu comunidad.
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-600">⏱️ 1 semana restante</span>
              <span className="text-purple-600">✅ 1,789 respuestas</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-900">
                Iniciativas Ambientales
              </h3>
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
                Finalizada
              </span>
            </div>
            <p className="text-green-700 mb-4">
              ¿Qué iniciativas ambientales te gustaría ver implementadas?
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">📊 Ver resultados</span>
              <span className="text-green-600">✅ 3,241 respuestas</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-orange-900">
                Seguridad Ciudadana
              </h3>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                Próximamente
              </span>
            </div>
            <p className="text-orange-700 mb-4">
              Comparte tu percepción sobre la seguridad en tu barrio.
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-orange-600">📅 Lanzamiento próximo</span>
              <span className="text-orange-600">🔔 Recibir notificación</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}