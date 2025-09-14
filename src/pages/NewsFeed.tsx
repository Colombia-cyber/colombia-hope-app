import React from 'react';
import LiveNewsFeed from '../components/LiveNewsFeed';
import TrendingTopics from '../components/TrendingTopics';
import PollsWidget from '../components/PollsWidget';
import SearchBar from '../components/SearchBar';

function NewsFeed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            📰 Centro de Noticias Colombia
            <span className="ml-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">LIVE</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Mantente informado con las últimas noticias verificadas, tendencias y análisis sobre Colombia.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main News Column */}
          <div className="lg:col-span-2 space-y-8">
            <LiveNewsFeed />
            
            {/* Featured Stories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                ⭐ Historias Destacadas
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">🏆 Innovación Digital</h4>
                  <p className="text-sm text-gray-700">Colombia lidera en Latinoamérica con la plataforma de participación ciudadana más avanzada</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                    <span>Hace 1 día</span>
                    <span>2.3K lecturas</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Datos Abiertos</h4>
                  <p className="text-sm text-gray-700">Nuevo portal de transparencia permite acceso directo a información gubernamental</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                    <span>Hace 2 días</span>
                    <span>1.8K lecturas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PollsWidget />
            <TrendingTopics />
            
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🔗 Enlaces Rápidos
              </h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🏛️</span>
                    <div>
                      <p className="font-medium text-sm">Congreso en Vivo</p>
                      <p className="text-xs text-gray-600">Sesión activa ahora</p>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <p className="font-medium text-sm">Nuevas Encuestas</p>
                      <p className="text-xs text-gray-600">3 encuestas disponibles</p>
                    </div>
                  </div>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">⚖️</span>
                    <div>
                      <p className="font-medium text-sm">Leyes en Debate</p>
                      <p className="text-xs text-gray-600">5 proyectos activos</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Emergency Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                🚨 Alertas Ciudadanas
              </h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">Alerta de Seguridad</p>
                  <p className="text-xs text-red-600 mt-1">Verificar información electoral en fuentes oficiales</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Mantenimiento</p>
                  <p className="text-xs text-yellow-600 mt-1">Sistema de votación en mantenimiento 2:00-4:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;