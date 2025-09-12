import React from 'react'

const LiveNewsFeed: React.FC = () => {
  const news = [
    { id: 1, title: 'Nuevo proyecto de ley sobre educación digital', time: '5 min ago' },
    { id: 2, title: 'Debate en el Senado sobre reforma tributaria', time: '15 min ago' },
    { id: 3, title: 'Presidente anuncia nuevas políticas ambientales', time: '30 min ago' },
    { id: 4, title: 'Congreso aprueba presupuesto para infraestructura', time: '1 hora ago' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
        Noticias en Vivo
      </h3>
      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-3 last:border-b-0">
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">{item.time}</p>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
        Ver todas las noticias →
      </button>
    </div>
  )
}

export default LiveNewsFeed