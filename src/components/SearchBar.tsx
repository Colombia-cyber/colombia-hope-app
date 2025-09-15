import React, { useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  type: 'news' | 'bill' | 'session' | 'senator' | 'document';
  content: string;
  category: string;
  relevance: number;
  date: string;
  url: string;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock search data - in real app this would come from API
  const mockSearchData: SearchResult[] = [
    {
      id: 'news-1',
      title: 'Debate en el Senado sobre Participación Ciudadana Digital',
      type: 'news',
      content: 'El Senado debate actualmente el Proyecto de Ley 125 que busca fortalecer los mecanismos de participación ciudadana...',
      category: 'Política',
      relevance: 95,
      date: '2024-01-16',
      url: '/news#news-1'
    },
    {
      id: 'bill-125',
      title: 'PL 125 - Participación Ciudadana Digital',
      type: 'bill',
      content: 'Nueva propuesta para fortalecer los mecanismos de participación ciudadana a través de plataformas digitales...',
      category: 'Tecnología',
      relevance: 98,
      date: '2024-01-10',
      url: '/legislation#PL125'
    },
    {
      id: 'senator-1',
      title: 'Sen. María González',
      type: 'senator',
      content: 'Senadora del Partido Liberal por Bogotá, ponente del PL 125 sobre participación ciudadana digital...',
      category: 'Congresistas',
      relevance: 87,
      date: '2024-01-16',
      url: '/congress#senator-1'
    },
    {
      id: 'session-1',
      title: 'Sesión Plenaria del Senado - 16 Enero 2024',
      type: 'session',
      content: 'Debate sobre participación ciudadana digital, asistencia 87/108 senadores, votación pendiente...',
      category: 'Sesiones',
      relevance: 92,
      date: '2024-01-16',
      url: '/congress'
    }
  ];

  const searchFilters = [
    { key: 'all', label: 'Todo', icon: '🔍' },
    { key: 'news', label: 'Noticias', icon: '📰' },
    { key: 'bill', label: 'Proyectos', icon: '📋' },
    { key: 'session', label: 'Sesiones', icon: '🏛️' },
    { key: 'senator', label: 'Congresistas', icon: '👥' },
    { key: 'document', label: 'Documentos', icon: '📄' }
  ];

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockSearchData.filter(item => {
        const matchesText = item.title.toLowerCase().includes(term.toLowerCase()) ||
                           item.content.toLowerCase().includes(term.toLowerCase());
        const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
        return matchesText && matchesFilter;
      }).sort((a, b) => b.relevance - a.relevance);
      
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to full search results page
      console.log('Full search for:', searchTerm);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return '📰';
      case 'bill': return '📋';
      case 'session': return '🏛️';
      case 'senator': return '👤';
      case 'document': return '📄';
      default: return '🔍';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'Noticia';
      case 'bill': return 'Proyecto de ley';
      case 'session': return 'Sesión';
      case 'senator': return 'Congresista';
      case 'document': return 'Documento';
      default: return 'Resultado';
    }
  };

  const quickSearches = [
    'Participación ciudadana',
    'Transparencia gubernamental', 
    'Educación digital',
    'María González',
    'PL 125',
    'Sesión Senado'
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
          placeholder="Buscar noticias, proyectos, sesiones, congresistas..."
          className="w-full px-4 py-3 pl-12 pr-20 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          Buscar
        </button>
      </form>

      {/* Enhanced Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-hidden">
          {/* Search Filters */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {searchFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => {
                    setSelectedFilter(filter.key);
                    handleSearch(searchTerm);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    selectedFilter === filter.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.icon} {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Buscando...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {searchResults.slice(0, 5).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        console.log('Navigate to:', result.url);
                        setIsSearchOpen(false);
                        setSearchTerm('');
                      }}
                      className="w-full p-4 text-left hover:bg-blue-50 transition"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{getTypeIcon(result.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-800 truncate">{result.title}</h4>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{result.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">{result.category}</span>
                            <span className="text-xs text-gray-400">
                              {new Date(result.date).toLocaleDateString('es-CO')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="p-3 text-center border-t border-gray-100">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Ver todos los {searchResults.length} resultados →
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
                  <p className="text-xs text-gray-400 mt-1">Intenta con otros términos</p>
                </div>
              )}
            </div>
          )}

          {/* Quick Searches */}
          {!searchTerm && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Búsquedas populares:</h4>
              <div className="space-y-2">
                {quickSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(search);
                      handleSearch(search);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition"
                  >
                    🔍 {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;