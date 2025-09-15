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
  verified?: boolean;
  sourceReliability?: 'high' | 'medium' | 'low';
  urgency?: 'critical' | 'high' | 'normal';
  region?: string;
  tags?: string[];
}

const LiveNewsFeed: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "🔴 EN VIVO: Debate en el Senado sobre Participación Ciudadana Digital",
      excerpt: "El Senado debate actualmente el Proyecto de Ley 125 que busca fortalecer los mecanismos de participación ciudadana a través de plataformas digitales.",
      category: "Política",
      timestamp: "En vivo",
      comments: 342,
      likes: 1287,
      isLive: true,
      verified: true,
      sourceReliability: 'high',
      urgency: 'critical',
      region: 'Nacional',
      tags: ['Congreso', 'Ley', 'Participación', 'Digital']
    },
    {
      id: 2,
      title: "Nueva encuesta revela alta aprobación de la transparencia gubernamental",
      excerpt: "El 84% de los ciudadanos consultados expresan satisfacción con las nuevas medidas de transparencia implementadas en las instituciones públicas.",
      category: "Transparencia",
      timestamp: "Hace 2 horas",
      comments: 156,
      likes: 892,
      verified: true,
      sourceReliability: 'high',
      urgency: 'normal',
      region: 'Nacional',
      tags: ['Encuesta', 'Aprobación', 'Gobierno']
    },
    {
      id: 3,
      title: "Colombia lidera en innovación de democracia digital en Latinoamérica",
      excerpt: "Un estudio internacional destaca las iniciativas colombianas de participación ciudadana digital como modelo para la región.",
      category: "Internacional",
      timestamp: "Hace 4 horas",
      comments: 89,
      likes: 567,
      verified: true,
      sourceReliability: 'high',
      urgency: 'normal',
      region: 'Internacional',
      tags: ['Innovación', 'Democracia', 'Latinoamérica', 'Liderazgo']
    },
    {
      id: 4,
      title: "Propuesta ciudadana para mejorar la educación digital alcanza 50,000 firmas",
      excerpt: "La iniciativa busca garantizar acceso universal a internet y dispositivos digitales en las instituciones educativas del país.",
      category: "Educación",
      timestamp: "Hace 6 horas",
      comments: 234,
      likes: 1456,
      verified: true,
      sourceReliability: 'high',
      urgency: 'high',
      region: 'Nacional',
      tags: ['Educación', 'Firmas', 'Internet', 'Acceso']
    },
    {
      id: 5,
      title: "Comisión de Transparencia publica nuevos datos sobre gestión pública",
      excerpt: "Se han publicado más de 500 conjuntos de datos sobre presupuestos, contratos y programas gubernamentales.",
      category: "Transparencia",
      timestamp: "Hace 8 horas",
      comments: 67,
      likes: 398,
      verified: true,
      sourceReliability: 'high',
      urgency: 'normal',
      region: 'Nacional',
      tags: ['Datos', 'Presupuesto', 'Contratos', 'Gobierno']
    },
    {
      id: 6,
      title: "Análisis: Impacto de las nuevas tecnologías en la participación ciudadana",
      excerpt: "Expertos evalúan cómo las plataformas digitales están transformando la forma en que los ciudadanos participan en la democracia.",
      category: "Análisis",
      timestamp: "Hace 12 horas",
      comments: 178,
      likes: 734,
      verified: true,
      sourceReliability: 'medium',
      urgency: 'normal',
      region: 'Nacional',
      tags: ['Análisis', 'Tecnología', 'Participación', 'Democracia']
    }
  ];

  const categories = ['all', 'Política', 'Transparencia', 'Internacional', 'Educación', 'Análisis'];

  let filteredNews = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  if (showVerifiedOnly) {
    filteredNews = filteredNews.filter(item => item.verified);
  }

  // Sort news items
  filteredNews.sort((a, b) => {
    if (sortBy === 'likes') {
      return b.likes - a.likes;
    }
    if (sortBy === 'comments') {
      return b.comments - a.comments;
    }
    if (sortBy === 'urgency') {
      const urgencyOrder = { critical: 3, high: 2, normal: 1 };
      return (urgencyOrder[b.urgency || 'normal'] || 1) - (urgencyOrder[a.urgency || 'normal'] || 1);
    }
    // Default: timestamp (newest first)
    return a.id > b.id ? -1 : 1;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Política': return 'bg-blue-100 text-blue-800';
      case 'Transparencia': return 'bg-green-100 text-green-800';
      case 'Internacional': return 'bg-purple-100 text-purple-800';
      case 'Educación': return 'bg-orange-100 text-orange-800';
      case 'Análisis': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReliabilityIndicator = (reliability: string | undefined) => {
    switch (reliability) {
      case 'high': return { color: 'text-green-600', icon: '✓', label: 'Alta confiabilidad' };
      case 'medium': return { color: 'text-yellow-600', icon: '!', label: 'Confiabilidad media' };
      case 'low': return { color: 'text-red-600', icon: '⚠', label: 'Verificar fuente' };
      default: return { color: 'text-gray-600', icon: '?', label: 'Sin verificar' };
    }
  };

  const getUrgencyColor = (urgency: string | undefined) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          📡 Stream de Noticias en Vivo
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">EN VIVO</span>
          </div>
          <span className="text-sm text-gray-500">
            {filteredNews.length} noticias
          </span>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="mb-6 space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
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

        {/* Advanced Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showVerifiedOnly}
                onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Solo noticias verificadas</span>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </label>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white"
          >
            <option value="timestamp">Más recientes</option>
            <option value="likes">Más populares</option>
            <option value="comments">Más comentarios</option>
            <option value="urgency">Más urgentes</option>
          </select>
        </div>
      </div>

      {/* Enhanced News Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((item) => {
          const reliability = getReliabilityIndicator(item.sourceReliability);
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                item.isLive 
                  ? 'border-red-200 bg-red-50' 
                  : getUrgencyColor(item.urgency)
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  {item.isLive && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                      LIVE
                    </span>
                  )}
                  {item.verified && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ VERIFICADO
                    </span>
                  )}
                  {item.urgency === 'critical' && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      🚨 CRÍTICO
                    </span>
                  )}
                  {item.urgency === 'high' && (
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⚡ URGENTE
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">{item.timestamp}</span>
                  <span className="text-xs text-gray-400">{item.region}</span>
                </div>
              </div>

              <h4 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                {item.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.excerpt}
              </p>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-gray-400 text-xs">+{item.tags.length - 3} más</span>
                  )}
                </div>
              )}

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

                  <button className="flex items-center space-x-1 hover:text-green-600 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Compartir</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${reliability.color}`} title={reliability.label}>
                    {reliability.icon} {reliability.label}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Leer más →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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