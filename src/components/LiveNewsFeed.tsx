import React, { useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  timestamp: string;
  comments: number;
  likes: number;
  isLive?: boolean;
  image?: string;
}

const LiveNewsFeed: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "🔴 EN VIVO: Debate en el Senado sobre Participación Ciudadana Digital",
      excerpt: "El Senado debate actualmente el Proyecto de Ley 125 que busca fortalecer los mecanismos de participación ciudadana a través de plataformas digitales.",
      category: "Política",
      timestamp: "En vivo",
      comments: 342,
      likes: 1287,
      isLive: true
    },
    {
      id: 2,
      title: "Nueva encuesta revela alta aprobación de la transparencia gubernamental",
      excerpt: "El 84% de los ciudadanos consultados expresan satisfacción con las nuevas medidas de transparencia implementadas en las instituciones públicas.",
      category: "Transparencia",
      timestamp: "Hace 2 horas",
      comments: 156,
      likes: 892
    },
    {
      id: 3,
      title: "Colombia lidera en innovación de democracia digital en Latinoamérica",
      excerpt: "Un estudio internacional destaca las iniciativas colombianas de participación ciudadana digital como modelo para la región.",
      category: "Internacional",
      timestamp: "Hace 4 horas",
      comments: 89,
      likes: 567
    },
    {
      id: 4,
      title: "Propuesta ciudadana para mejorar la educación digital alcanza 50,000 firmas",
      excerpt: "La iniciativa busca garantizar acceso universal a internet y dispositivos digitales en las instituciones educativas del país.",
      category: "Educación",
      timestamp: "Hace 6 horas",
      comments: 234,
      likes: 1456
    },
    {
      id: 5,
      title: "Comisión de Transparencia publica nuevos datos sobre gestión pública",
      excerpt: "Se han publicado más de 500 conjuntos de datos sobre presupuestos, contratos y programas gubernamentales.",
      category: "Transparencia",
      timestamp: "Hace 8 horas",
      comments: 67,
      likes: 398
    }
  ];

  const categories = ['all', 'Política', 'Transparencia', 'Internacional', 'Educación'];

  const filteredNews = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Política': return 'bg-blue-100 text-blue-800';
      case 'Transparencia': return 'bg-green-100 text-green-800';
      case 'Internacional': return 'bg-purple-100 text-purple-800';
      case 'Educación': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          📡 Stream de Noticias en Vivo
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-red-600 font-medium">EN VIVO</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'Todas' : category}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
              item.isLive 
                ? 'border-red-200 bg-red-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
                {item.isLive && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    LIVE
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{item.timestamp}</span>
            </div>

            <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
              {item.title}
            </h4>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {item.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 hover:text-red-600 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{item.likes}</span>
                </button>
                
                <button className="flex items-center space-x-1 hover:text-blue-600 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{item.comments}</span>
                </button>
              </div>

              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Leer más →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Ver todas las noticias →
        </button>
      </div>
    </div>
  );
};

export default LiveNewsFeed;