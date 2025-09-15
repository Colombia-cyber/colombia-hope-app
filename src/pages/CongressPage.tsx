import React, { useState } from 'react';

interface Senator {
  id: number;
  name: string;
  party: string;
  region: string;
  attendance: number;
  votingRecord: {
    favor: number;
    against: number;
    abstention: number;
  };
  isPresent: boolean;
  isSpeaking?: boolean;
}

interface Bill {
  id: string;
  title: string;
  status: 'debate' | 'voting' | 'approved' | 'rejected';
  votes?: {
    favor: number;
    against: number;
    abstention: number;
  };
}

interface SessionData {
  sessionType: string;
  startTime: string;
  attendance: number;
  totalMembers: number;
  currentAgendaItem: number;
  totalAgendaItems: number;
  bills: Bill[];
  speakers: Senator[];
}

const CongressPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('senado');
  const [viewMode, setViewMode] = useState<'live' | 'analytics' | 'history'>('live');

  const senatorsData: Senator[] = [
    {
      id: 1,
      name: 'María González',
      party: 'Partido Liberal',
      region: 'Bogotá',
      attendance: 94,
      votingRecord: { favor: 45, against: 12, abstention: 3 },
      isPresent: true,
      isSpeaking: true
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      party: 'Centro Democrático',
      region: 'Antioquia',
      attendance: 87,
      votingRecord: { favor: 38, against: 18, abstention: 4 },
      isPresent: true
    },
    {
      id: 3,
      name: 'Ana Martínez',
      party: 'Polo Democrático',
      region: 'Valle del Cauca',
      attendance: 91,
      votingRecord: { favor: 42, against: 15, abstention: 3 },
      isPresent: true
    }
  ];

  const sessionData: SessionData = {
    sessionType: 'Sesión Plenaria',
    startTime: '9:00 AM',
    attendance: 87,
    totalMembers: 108,
    currentAgendaItem: 3,
    totalAgendaItems: 8,
    bills: [
      {
        id: 'PL125',
        title: 'Participación Ciudadana Digital',
        status: 'debate'
      },
      {
        id: 'PL098',
        title: 'Transparencia Gubernamental',
        status: 'voting',
        votes: { favor: 45, against: 28, abstention: 14 }
      }
    ],
    speakers: senatorsData.filter(s => s.isSpeaking || Math.random() > 0.7)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🏛️ Congreso en Vivo
              </h1>
              <p className="text-lg text-gray-600">
                Seguimiento en tiempo real de las sesiones del Congreso de la República de Colombia.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Asistencia en vivo</div>
              <div className="text-2xl font-bold text-green-600">
                {sessionData.attendance}/{sessionData.totalMembers}
              </div>
              <div className="text-sm text-gray-500">
                {Math.round((sessionData.attendance / sessionData.totalMembers) * 100)}% presente
              </div>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setViewMode('live')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'live'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔴 En Vivo
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'analytics'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Analíticas
            </button>
            <button
              onClick={() => setViewMode('history')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                viewMode === 'history'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📚 Historial
            </button>
          </div>

          {/* Congress Body Navigation */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('senado')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'senado'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Senado ({sessionData.attendance}/108)
            </button>
            <button
              onClick={() => setActiveTab('camara')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'camara'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cámara de Representantes (0/166)
            </button>
            <button
              onClick={() => setActiveTab('comisiones')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'comisiones'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Comisiones (2 activas)
            </button>
          </div>

          {/* Content based on active tab and view mode */}
          {activeTab === 'senado' && viewMode === 'live' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-red-800">🔴 EN VIVO - {sessionData.sessionType}</h3>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">ACTIVO</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Debate sobre el Proyecto de Ley 125 - Participación Ciudadana Digital
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Iniciado: {sessionData.startTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Presente: {sessionData.attendance}/{sessionData.totalMembers}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Agenda: {sessionData.currentAgendaItem}/{sessionData.totalAgendaItems}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span>Hablando: {sessionData.speakers.filter(s => s.isSpeaking).length}</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Current Bills Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                      📋 Proyectos en Debate
                    </h4>
                    <div className="space-y-4">
                      {sessionData.bills.map((bill) => (
                        <div key={bill.id} className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-800">{bill.id} - {bill.title}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bill.status === 'debate' ? 'bg-yellow-100 text-yellow-800' :
                              bill.status === 'voting' ? 'bg-blue-100 text-blue-800' :
                              bill.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {bill.status === 'debate' ? 'En debate' :
                               bill.status === 'voting' ? 'Votación' :
                               bill.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                            </span>
                          </div>
                          {bill.votes && (
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="text-center">
                                <div className="text-green-600 font-bold">{bill.votes.favor}</div>
                                <div className="text-xs text-gray-500">A favor</div>
                              </div>
                              <div className="text-center">
                                <div className="text-red-600 font-bold">{bill.votes.against}</div>
                                <div className="text-xs text-gray-500">En contra</div>
                              </div>
                              <div className="text-center">
                                <div className="text-gray-600 font-bold">{bill.votes.abstention}</div>
                                <div className="text-xs text-gray-500">Abstención</div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agenda Progress */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-4">📅 Agenda del Día</h4>
                    <div className="space-y-3">
                      {[
                        { item: 'Verificación de quórum', status: 'completed' },
                        { item: 'Lectura del acta anterior', status: 'completed' },
                        { item: 'PL 125 - Participación Ciudadana', status: 'current' },
                        { item: 'PL 098 - Transparencia Gubernamental', status: 'pending' },
                        { item: 'PL 087 - Educación Digital', status: 'pending' },
                        { item: 'Proposiciones', status: 'pending' },
                        { item: 'Varios', status: 'pending' },
                        { item: 'Clausura', status: 'pending' }
                      ].map((agendaItem, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <span className={`w-3 h-3 rounded-full ${
                            agendaItem.status === 'completed' ? 'bg-green-500' :
                            agendaItem.status === 'current' ? 'bg-yellow-500 animate-pulse' :
                            'bg-gray-300'
                          }`}></span>
                          <span className={`text-sm ${
                            agendaItem.status === 'current' ? 'font-semibold text-gray-800' : 'text-gray-600'
                          }`}>
                            {agendaItem.item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Senators Activity */}
                <div className="space-y-4">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="font-bold text-purple-800 mb-4">🎤 Cola de Oradores</h4>
                    <div className="space-y-3">
                      {senatorsData.slice(0, 5).map((senator, index) => (
                        <div key={senator.id} className="flex items-center justify-between text-sm">
                          <div>
                            <div className={`font-medium ${senator.isSpeaking ? 'text-red-600' : 'text-gray-800'}`}>
                              {senator.name}
                            </div>
                            <div className="text-xs text-gray-500">{senator.party}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            senator.isSpeaking ? 'bg-red-100 text-red-800' :
                            index === 1 ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {senator.isSpeaking ? 'Hablando' :
                             index === 1 ? 'Siguiente' : 'En lista'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Stats */}
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h4 className="font-bold text-yellow-800 mb-4">📊 Estadísticas de Sesión</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Duración:</span>
                        <span className="font-medium">2h 15min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intervenciones:</span>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Votaciones:</span>
                        <span className="font-medium">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asistencia promedio:</span>
                        <span className="font-medium">81%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'senado' && viewMode === 'analytics' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Attendance Analytics */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-bold text-gray-800 mb-4">📈 Análisis de Asistencia</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Promedio último mes:</span>
                      <span className="font-bold text-green-600">89%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sesión con mayor asistencia:</span>
                      <span className="font-bold">96% (15 Ene)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Sesión con menor asistencia:</span>
                      <span className="font-bold">71% (3 Ene)</span>
                    </div>
                  </div>
                </div>

                {/* Voting Patterns */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="font-bold text-gray-800 mb-4">🗳️ Patrones de Votación</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Proyectos aprobados:</span>
                      <span className="font-bold text-green-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Proyectos rechazados:</span>
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>En debate:</span>
                      <span className="font-bold text-yellow-600">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Senator Performance */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-4">👥 Rendimiento de Senadores</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Senador</th>
                        <th className="text-left py-2">Partido</th>
                        <th className="text-left py-2">Región</th>
                        <th className="text-center py-2">Asistencia</th>
                        <th className="text-center py-2">A favor</th>
                        <th className="text-center py-2">En contra</th>
                        <th className="text-center py-2">Abstención</th>
                      </tr>
                    </thead>
                    <tbody>
                      {senatorsData.map((senator) => (
                        <tr key={senator.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 font-medium">{senator.name}</td>
                          <td className="py-3 text-gray-600">{senator.party}</td>
                          <td className="py-3 text-gray-600">{senator.region}</td>
                          <td className="py-3 text-center">
                            <span className={`font-medium ${
                              senator.attendance > 90 ? 'text-green-600' :
                              senator.attendance > 80 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {senator.attendance}%
                            </span>
                          </td>
                          <td className="py-3 text-center text-green-600">{senator.votingRecord.favor}</td>
                          <td className="py-3 text-center text-red-600">{senator.votingRecord.against}</td>
                          <td className="py-3 text-center text-gray-600">{senator.votingRecord.abstention}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'senado' && viewMode === 'history' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-4">📚 Historial de Sesiones</h4>
                <div className="space-y-4">
                  {[
                    { date: '15 Ene 2024', type: 'Plenaria', duration: '3h 20min', bills: 2, attendance: 96 },
                    { date: '12 Ene 2024', type: 'Plenaria', duration: '2h 45min', bills: 1, attendance: 89 },
                    { date: '10 Ene 2024', type: 'Comisión', duration: '1h 30min', bills: 3, attendance: 78 },
                    { date: '8 Ene 2024', type: 'Plenaria', duration: '4h 10min', bills: 4, attendance: 92 },
                    { date: '5 Ene 2024', type: 'Plenaria', duration: '2h 15min', bills: 1, attendance: 85 }
                  ].map((session, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-800">{session.type} - {session.date}</h5>
                          <p className="text-sm text-gray-600">
                            Duración: {session.duration} • {session.bills} proyectos debatidos
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">{session.attendance}%</div>
                          <div className="text-xs text-gray-500">Asistencia</div>
                        </div>
                      </div>
                    </div>
                  ))}
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