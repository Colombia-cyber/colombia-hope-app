import React from 'react'

const TrendingTopics: React.FC = () => {
  const topics = [
    { name: 'Reforma Tributaria', count: 1250 },
    { name: 'Educación Digital', count: 890 },
    { name: 'Medio Ambiente', count: 756 },
    { name: 'Infraestructura', count: 634 },
    { name: 'Salud Pública', count: 523 },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Temas Tendencia</h3>
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span className="text-sm font-medium">#{topic.name}</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              {topic.count} menciones
            </span>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
        Ver más tendencias →
      </button>
    </div>
  )
}

export default TrendingTopics