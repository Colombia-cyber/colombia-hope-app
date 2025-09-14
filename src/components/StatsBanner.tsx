import React from 'react';

const StatsBanner: React.FC = () => {
  const stats = [
    { value: '125K+', label: 'Ciudadanos Activos', color: 'text-yellow-600', icon: '👥' },
    { value: '2,847', label: 'Debates Abiertos', color: 'text-blue-600', icon: '💬' },
    { value: '1,532', label: 'Propuestas', color: 'text-red-600', icon: '📝' },
    { value: '94%', label: 'Satisfacción', color: 'text-green-600', icon: '⭐' }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 via-blue-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;