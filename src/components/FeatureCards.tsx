import React from 'react'

const FeatureCards: React.FC = () => {
  const features = [
    {
      title: 'Chat Ciudadano',
      description: 'Conecta con otros ciudadanos y debate sobre temas de interés nacional',
      icon: '💬',
    },
    {
      title: 'Noticias en Vivo',
      description: 'Mantente informado con las últimas noticias políticas y sociales',
      icon: '📰',
    },
    {
      title: 'Seguimiento Legislativo',
      description: 'Rastrea el progreso de leyes y propuestas en el Congreso',
      icon: '📊',
    },
    {
      title: 'Encuestas y Opinión',
      description: 'Participa en encuestas y comparte tu opinión sobre temas clave',
      icon: '🗳️',
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Funcionalidades Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards