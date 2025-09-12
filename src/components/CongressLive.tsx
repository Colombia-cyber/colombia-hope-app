import React from 'react'

const CongressLive: React.FC = () => {
  const sessions = [
    {
      chamber: 'Senado',
      topic: 'Debate sobre reforma tributaria',
      status: 'En vivo',
      speakers: 15,
      viewers: 1200,
      startTime: '14:00',
    },
    {
      chamber: 'Cámara de Representantes',
      topic: 'Discusión proyecto educación digital',
      status: 'Próximamente',
      speakers: 8,
      viewers: 0,
      startTime: '16:30',
    },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Congreso en Vivo</h3>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{session.chamber}</h4>
                <p className="text-sm text-gray-600 mt-1">{session.topic}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">
                    👥 {session.speakers} oradores
                  </span>
                  {session.status === 'En vivo' && (
                    <span className="text-xs text-gray-500">
                      👁️ {session.viewers} viendo
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    🕐 {session.startTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  session.status === 'En vivo' 
                    ? 'bg-red-100 text-red-800 animate-pulse' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {session.status}
                </span>
                {session.status === 'En vivo' && (
                  <button className="mt-2 text-blue-600 text-xs hover:underline">
                    Ver transmisión
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CongressLive