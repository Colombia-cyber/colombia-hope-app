import React from 'react';
import { Link } from 'react-router-dom';

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  to: string;
  gradient: string;
  bgColor: string;
}

const FeatureCards: React.FC = () => {
  const features: FeatureCard[] = [
    {
      title: "Live Feed & Reels",
      description: "Contenido en tiempo real y videos cortos sobre temas de actualidad política y social",
      icon: "📱",
      to: "/news",
      gradient: "from-yellow-50 to-yellow-100",
      bgColor: "text-yellow-800"
    },
    {
      title: "Pulso Presidencial",
      description: "Encuestas en vivo sobre decisiones presidenciales y políticas gubernamentales",
      icon: "📊",
      to: "/survey",
      gradient: "from-blue-50 to-blue-100",
      bgColor: "text-blue-800"
    },
    {
      title: "Stream de Noticias",
      description: "Noticias verificadas y actualizadas en tiempo real desde fuentes oficiales",
      icon: "📰",
      to: "/news",
      gradient: "from-green-50 to-green-100",
      bgColor: "text-green-800"
    },
    {
      title: "Módulos Cívicos",
      description: "Herramientas educativas sobre participación ciudadana y democracia",
      icon: "🏛️",
      to: "/legislation",
      gradient: "from-purple-50 to-purple-100",
      bgColor: "text-purple-800"
    },
    {
      title: "Merch & Movilización",
      description: "Productos oficiales y herramientas para organizar movilizaciones ciudadanas",
      icon: "🛍️",
      to: "/chat",
      gradient: "from-red-50 to-red-100",
      bgColor: "text-red-800"
    },
    {
      title: "Seguridad",
      description: "Reportes de seguridad, alertas ciudadanas y medidas de protección",
      icon: "🛡️",
      to: "/analytics",
      gradient: "from-orange-50 to-orange-100",
      bgColor: "text-orange-800"
    },
    {
      title: "Chat Ciudadano",
      description: "Conecta con otros ciudadanos y participa en discusiones constructivas",
      icon: "💬",
      to: "/chat",
      gradient: "from-indigo-50 to-indigo-100",
      bgColor: "text-indigo-800"
    },
    {
      title: "Seguimiento Legislativo",
      description: "Monitorea proyectos de ley, debates y decisiones del Congreso",
      icon: "⚖️",
      to: "/legislation",
      gradient: "from-teal-50 to-teal-100",
      bgColor: "text-teal-800"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🇨🇴 Participa en la Democracia Digital de Colombia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre todas las herramientas disponibles para ejercer tu ciudadanía 
            de manera activa y constructiva en la democracia colombiana.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.to}
              className={`bg-gradient-to-br ${feature.gradient} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${feature.bgColor}`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800">
                Explorar
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;