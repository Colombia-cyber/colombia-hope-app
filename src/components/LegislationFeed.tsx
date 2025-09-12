import React from 'react'

const LegislationFeed: React.FC = () => {
  const legislation = [
    {
      title: 'Proyecto de Ley 123/2024',
      description: 'Ley de modernización del sistema educativo colombiano',
      status: 'En comisión',
      chamber: 'Cámara de Representantes',
      lastUpdate: '2 días ago',
    },
    {
      title: 'Proyecto de Ley 098/2024',
      description: 'Reforma al código tributario nacional',
      status: 'Segundo debate',
      chamber: 'Senado',
      lastUpdate: '1 semana ago',
    },
    {
      title: 'Proyecto de Ley 076/2024',
      description: 'Protección de datos personales y privacidad digital',
      status: 'Primer debate',
      chamber: 'Cámara de Representantes',
      lastUpdate: '3 días ago',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En comisión': return 'bg-yellow-100 text-yellow-800'
      case 'Primer debate': return 'bg-blue-100 text-blue-800'
      case 'Segundo debate': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Seguimiento Legislativo</h3>
      <div className="space-y-4">
        {legislation.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <h4 className="font-medium text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-xs text-gray-500">{item.chamber}</span>
              </div>
              <span className="text-xs text-gray-500">{item.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
        Ver toda la legislación →
      </button>
    </div>
  )
}

export default LegislationFeed