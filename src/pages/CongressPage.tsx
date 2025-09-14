import React, { useState } from 'react';

const CongressPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('senado');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🏛️ Congreso en Vivo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Seguimiento en tiempo real de las sesiones del Congreso de la República de Colombia.
          </p>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('senado')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'senado'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Senado
            </button>
            <button
              onClick={() => setActiveTab('camara')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'camara'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cámara de Representantes
            </button>
            <button
              onClick={() => setActiveTab('comisiones')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'comisiones'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Comisiones
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'senado' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-800">🔴 EN VIVO - Sesión Plenaria</h3>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">ACTIVO</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Debate sobre el Proyecto de Ley 125 - Participación Ciudadana Digital
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Iniciado: 9:00 AM</span>
                  <span>Senadores presentes: 87/108</span>
                  <span>Orden del día: Item 3 de 8</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-3">Agenda del Día</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Verificación de quórum
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Lectura del acta anterior
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                      PL 125 - Participación Ciudadana
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      PL 098 - Transparencia Gubernamental
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-3">Senadores Hablando</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Sen. María González</span>
                      <span className="text-green-600">En uso de la palabra</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sen. Carlos Ruiz</span>
                      <span className="text-blue-600">Próximo turno</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sen. Ana Martínez</span>
                      <span className="text-gray-600">En lista</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'camara' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cámara de Representantes</h3>
              <p className="text-gray-600">No hay sesiones programadas para hoy</p>
              <p className="text-sm text-gray-500 mt-2">Próxima sesión: Miércoles, 17 de Enero a las 10:00 AM</p>
            </div>
          )}

          {activeTab === 'comisiones' && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-yellow-800">Primera Comisión Constitucional</h4>
                    <p className="text-sm text-gray-600">Revisión de reformas constitucionales</p>
                  </div>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">EN SESIÓN</span>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Sexta Comisión Constitucional</h4>
                    <p className="text-sm text-gray-600">Asuntos de comunicaciones y tecnología</p>
                  </div>
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">RECESO</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CongressPage;