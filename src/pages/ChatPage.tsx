export default function ChatPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">💬 Chat Comunitario</h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Bienvenido al chat comunitario de Colombia Hope. Aquí puedes conectar con otros ciudadanos
            y participar en conversaciones sobre temas importantes para nuestro país.
          </p>
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4">
            <p className="text-blue-700">
              <strong>Próximamente:</strong> Sistema de chat en tiempo real con moderación automática
              y salas temáticas.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">🏛️ Política</h3>
            <p className="text-blue-700 text-sm">Discusiones sobre políticas públicas</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🌱 Medio Ambiente</h3>
            <p className="text-green-700 text-sm">Iniciativas ambientales locales</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">🎓 Educación</h3>
            <p className="text-purple-700 text-sm">Mejoras educativas comunitarias</p>
          </div>
        </div>
      </div>
    </div>
  );
}