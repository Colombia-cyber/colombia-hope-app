import React from 'react'

const StatsBanner: React.FC = () => {
  const stats = [
    { number: '1.2M+', label: 'Ciudadanos Participando' },
    { number: '450+', label: 'Debates Activos' },
    { number: '120+', label: 'Propuestas Legislativas' },
    { number: '85%', label: 'Satisfacción Ciudadana' },
  ]

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBanner