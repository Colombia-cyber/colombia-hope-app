import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="min-h-screen">
      {/* Vibrant Gradient Header */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Colombia Hope
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Conectando ciudadanos, construyendo democracia participativa y forjando un futuro con esperanza para Colombia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Comenzar
            </Link>
            <Link
              to="/news"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explorar
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Panel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">125K+</div>
              <div className="text-gray-600">Ciudadanos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2,847</div>
              <div className="text-gray-600">Debates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1,532</div>
              <div className="text-gray-600">Propuestas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">94%</div>
              <div className="text-gray-600">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Participa en la Democracia Digital
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              to="/chat"
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">Chat Ciudadano</h3>
              <p className="text-gray-600">Conecta con otros ciudadanos y comparte ideas en tiempo real</p>
            </Link>
            
            <Link
              to="/news"
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📰</div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Noticias</h3>
              <p className="text-gray-600">Mantente informado con las últimas noticias y tendencias</p>
            </Link>
            
            <Link
              to="/debate"
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚖️</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-800">Seguimiento Legislativo</h3>
              <p className="text-gray-600">Participa en debates sobre propuestas y leyes importantes</p>
            </Link>
            
            <Link
              to="/survey"
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-800">Encuestas</h3>
              <p className="text-gray-600">Participa en encuestas y ayuda a dar forma a las políticas</p>
            </Link>
          </div>
        </div>
      </section>

      {/* News Feed Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main News Feed */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Últimas Noticias</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Nueva Propuesta de Ley sobre Participación Ciudadana</h3>
                  <p className="text-gray-600 mb-4">El Congreso debate una nueva ley que fortalecería los mecanismos de participación ciudadana en Colombia...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Hace 2 horas</span>
                    <span>124 comentarios</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Resultados de la Encuesta Nacional sobre Transparencia</h3>
                  <p className="text-gray-600 mb-4">Los ciudadanos expresan su opinión sobre las medidas de transparencia gubernamental implementadas este año...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Hace 5 horas</span>
                    <span>89 comentarios</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Temas Tendencia</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">#</span>
                    <span className="text-sm">Participación Ciudadana</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">#</span>
                    <span className="text-sm">Transparencia</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">#</span>
                    <span className="text-sm">Democracia Digital</span>
                  </div>
                </div>
              </div>

              {/* Live Poll */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Encuesta en Vivo</h3>
                <p className="text-sm mb-4">¿Cree que la participación ciudadana digital mejora la democracia?</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Sí</span>
                    <span className="text-sm">78%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">No</span>
                    <span className="text-sm">22%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '22%'}}></div>
                  </div>
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