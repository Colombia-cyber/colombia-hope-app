export default function DebatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">🗣️ Debate Público</h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Participa en debates estructurados sobre temas de interés nacional. 
            Un espacio para el intercambio respetuoso de ideas y la construcción democrática.
          </p>
          <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
            <p className="text-orange-700">
              <strong>Próximamente:</strong> Sistema de debates con moderación, votaciones y 
              seguimiento de propuestas ciudadanas.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Reforma de la Salud Pública
              </h3>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                Activo
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              ¿Cómo mejorar el sistema de salud en Colombia? Comparte tu experiencia y propuestas.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>🗳️ 1,234 participantes</span>
              <span className="mx-2">•</span>
              <span>⏰ Termina en 5 días</span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Transporte Público Sostenible
              </h3>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Programado
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Iniciativas para mejorar el transporte público y reducir la contaminación.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>📅 Inicia el 20 de Septiembre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}