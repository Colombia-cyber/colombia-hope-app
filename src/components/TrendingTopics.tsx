import React from 'react';

const TrendingTopics: React.FC = () => {
  const trendingTopics = [
    { topic: 'Participación Ciudadana', posts: '2.8K', trend: 'up', icon: '🏛️' },
    { topic: 'Transparencia Gubernamental', posts: '1.9K', trend: 'up', icon: '🔍' },
    { topic: 'Educación Digital', posts: '1.7K', trend: 'up', icon: '🎓' },
    { topic: 'Reforma Salud', posts: '1.4K', trend: 'down', icon: '🏥' },
    { topic: 'Seguridad Nacional', posts: '1.3K', trend: 'up', icon: '🛡️' },
    { topic: 'Medio Ambiente', posts: '1.1K', trend: 'up', icon: '🌱' },
    { topic: 'Economía Digital', posts: '987', trend: 'down', icon: '💰' },
    { topic: 'Derechos Humanos', posts: '856', trend: 'up', icon: '⚖️' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        🔥 Temas en Tendencia
      </h3>
      
      <div className="space-y-3">
        {trendingTopics.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{item.topic}</p>
                <p className="text-xs text-gray-500">{item.posts} publicaciones</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.trend === 'up' ? (
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              <span className={`text-xs font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-800 font-medium text-sm">
          Ver todos los temas →
        </button>
      </div>
    </div>
  );
};

export default TrendingTopics;