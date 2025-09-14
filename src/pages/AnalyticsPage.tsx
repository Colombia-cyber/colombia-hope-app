import React, { useState } from 'react';

const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            📊 Analytics & Insights
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Análisis de datos y tendencias de participación ciudadana en Colombia.
          </p>

          {/* Time Frame Selector */}
          <div className="flex space-x-4 mb-8">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {period === 'day' && 'Día'}
                {period === 'week' && 'Semana'}
                {period === 'month' && 'Mes'}
                {period === 'year' && 'Año'}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Usuarios Activos</p>
                  <p className="text-2xl font-bold text-blue-800">125,847</p>
                  <p className="text-sm text-green-600">+12.5% vs semana anterior</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Debates Activos</p>
                  <p className="text-2xl font-bold text-green-800">2,847</p>
                  <p className="text-sm text-green-600">+8.3% vs semana anterior</p>
                </div>
                <div className="text-3xl">💬</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Propuestas</p>
                  <p className="text-2xl font-bold text-purple-800">1,532</p>
                  <p className="text-sm text-red-600">-2.1% vs semana anterior</p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Satisfacción</p>
                  <p className="text-2xl font-bold text-orange-800">94.2%</p>
                  <p className="text-sm text-green-600">+1.8% vs semana anterior</p>
                </div>
                <div className="text-3xl">⭐</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Participación por Región</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Bogotá D.C.</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Antioquia</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">72%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Valle del Cauca</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Atlántico</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '61%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">61%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Cundinamarca</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '55%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">55%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Temas Más Debatidos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏛️</span>
                  <span className="font-medium">Participación Ciudadana</span>
                </div>
                <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">2,847</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔍</span>
                  <span className="font-medium">Transparencia</span>
                </div>
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-sm">1,924</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎓</span>
                  <span className="font-medium">Educación</span>
                </div>
                <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm">1,675</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏥</span>
                  <span className="font-medium">Salud</span>
                </div>
                <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">1,432</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🛡️</span>
                  <span className="font-medium">Seguridad</span>
                </div>
                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">1,298</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <span className="text-2xl">📊</span>
              <div className="flex-1">
                <p className="font-medium">Nueva encuesta sobre transparencia gubernamental</p>
                <p className="text-sm text-gray-600">5,847 respuestas recibidas en las últimas 24 horas</p>
              </div>
              <span className="text-sm text-gray-500">Hace 2 horas</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <span className="text-2xl">💬</span>
              <div className="flex-1">
                <p className="font-medium">Debate trending: Educación Digital en Colombia</p>
                <p className="text-sm text-gray-600">1,234 participantes activos</p>
              </div>
              <span className="text-sm text-gray-500">Hace 4 horas</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <span className="text-2xl">📝</span>
              <div className="flex-1">
                <p className="font-medium">Nueva propuesta ciudadana publicada</p>
                <p className="text-sm text-gray-600">Reforma al sistema de salud pública</p>
              </div>
              <span className="text-sm text-gray-500">Hace 6 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;