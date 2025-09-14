import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="min-h-screen">
      {/* Colombian-themed Hero with Background */}
      <section className="relative min-h-screen bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 text-white py-20 px-4 overflow-hidden">
        {/* Colombian Flag Inspired Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-1/3 bg-yellow-400"></div>
          <div className="h-1/3 bg-blue-600"></div>
          <div className="h-1/3 bg-red-600"></div>
        </div>
        
        {/* Sunlight Effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Eagle Silhouette Effect */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10C45 15 40 20 35 30C30 40 25 50 30 60C35 70 45 75 50 80C55 75 65 70 70 60C75 50 70 40 65 30C60 20 55 15 50 10Z"/>
          </svg>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🇨🇴</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              Colombia Hope
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-yellow-100 max-w-4xl mx-auto leading-relaxed">
            🦅 Conectando ciudadanos, construyendo democracia participativa y forjando un futuro con esperanza para Colombia ☀️
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/chat"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-yellow-300"
            >
              🚀 Comenzar Ahora
            </Link>
            <Link
              to="/news"
              className="border-2 border-yellow-300 text-yellow-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🔍 Explorar Plataforma
            </Link>
          </div>
          
          <div className="text-yellow-200 text-sm">
            ✨ Plataforma Oficial de Participación Ciudadana Digital • República de Colombia ✨
          </div>
        </div>
      </section>

      {/* Stats Panel with Colombian Colors */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 via-blue-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">👥</div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">125K+</div>
              <div className="text-gray-700 font-medium">Ciudadanos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,847</div>
              <div className="text-gray-700 font-medium">Debates Abiertos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-4xl font-bold text-red-600 mb-2">1,532</div>
              <div className="text-gray-700 font-medium">Propuestas Ciudadanas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-4xl font-bold text-green-600 mb-2">94%</div>
              <div className="text-gray-700 font-medium">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid - Replace old feature grid with FeatureCards */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            🇨🇴 Participa en la Democracia Digital de Colombia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              to="/chat"
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-yellow-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-800">Chat Ciudadano</h3>
              <p className="text-gray-600">Conecta con otros ciudadanos y comparte ideas en tiempo real</p>
            </Link>
            
            <Link
              to="/news"
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-blue-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📰</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Noticias</h3>
              <p className="text-gray-600">Mantente informado con las últimas noticias y tendencias</p>
            </Link>
            
            <Link
              to="/legislation"
              className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-red-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚖️</div>
              <h3 className="text-xl font-semibold mb-2 text-red-800">Seguimiento Legislativo</h3>
              <p className="text-gray-600">Participa en debates sobre propuestas y leyes importantes</p>
            </Link>
            
            <Link
              to="/survey"
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-green-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Encuestas</h3>
              <p className="text-gray-600">Participa en encuestas y ayuda a dar forma a las políticas</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced News Feed Section with Colombian theming */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 via-blue-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main News Feed */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                📡 Últimas Noticias en Vivo
                <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">LIVE</span>
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                  <div className="flex items-center mb-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium mr-2">🔴 EN VIVO</span>
                    <span className="text-sm text-gray-500">Ahora mismo</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Debate en el Senado sobre Participación Ciudadana Digital</h3>
                  <p className="text-gray-600 mb-4">El Congreso debate una nueva ley que fortalecería los mecanismos de participación ciudadana en Colombia...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>👀 1,247 viendo en vivo</span>
                    <span>💬 342 comentarios</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
                  <div className="flex items-center mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mr-2">🔥 TRENDING</span>
                    <span className="text-sm text-gray-500">Hace 2 horas</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Resultados de la Encuesta Nacional sobre Transparencia</h3>
                  <p className="text-gray-600 mb-4">Los ciudadanos expresan su opinión sobre las medidas de transparencia gubernamental implementadas este año...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📊 5,847 participantes</span>
                    <span>💬 189 comentarios</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Live Presidential Poll */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  📊 Pulso Presidencial
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </h3>
                <p className="text-sm mb-4 font-medium">¿Cómo califica la gestión presidencial esta semana?</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">👍 Excelente</span>
                    <span className="text-sm font-bold text-green-600">34%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '34%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">😐 Regular</span>
                    <span className="text-sm font-bold text-yellow-600">45%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">👎 Deficiente</span>
                    <span className="text-sm font-bold text-red-600">21%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '21%'}}></div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Participar
                  </button>
                </div>
              </div>

              {/* Trending Topics */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  🔥 Temas Tendencia
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">#1</span>
                      <span className="text-sm">Participación Digital</span>
                    </div>
                    <span className="text-xs text-green-600">+15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">#2</span>
                      <span className="text-sm">Transparencia</span>
                    </div>
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">#3</span>
                      <span className="text-sm">Educación Digital</span>
                    </div>
                    <span className="text-xs text-green-600">+8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">#4</span>
                      <span className="text-sm">Seguridad</span>
                    </div>
                    <span className="text-xs text-red-600">-3%</span>
                  </div>
                </div>
              </div>

              {/* Security Alert */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  🛡️ Alertas de Seguridad
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 mb-2">
                    <strong>Alerta:</strong> Detectada desinformación sobre votaciones
                  </p>
                  <p className="text-xs text-red-600">
                    Verifica siempre la información en fuentes oficiales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;