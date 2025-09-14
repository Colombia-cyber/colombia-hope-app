import React, { useState } from 'react';

interface Debate {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'live' | 'scheduled' | 'closed';
  participants: number;
  startTime: string;
  duration: string;
  moderator: string;
  sides: { pro: number; con: number; neutral: number };
}

interface Argument {
  id: number;
  author: string;
  position: 'pro' | 'con' | 'neutral';
  content: string;
  timestamp: string;
  votes: number;
  replies: number;
}

function DebatePage() {
  const [selectedDebate, setSelectedDebate] = useState<number | null>(1);
  const [newArgument, setNewArgument] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<'pro' | 'con' | 'neutral'>('pro');

  const debates: Debate[] = [
    {
      id: 1,
      title: 'Implementación de Voto Electrónico en Colombia',
      description: '¿Debería Colombia implementar un sistema de voto electrónico para las próximas elecciones?',
      category: 'Democracia Digital',
      status: 'live',
      participants: 1247,
      startTime: '14:00',
      duration: '2 horas',
      moderator: 'Dr. Carlos Mendoza',
      sides: { pro: 689, con: 423, neutral: 135 }
    },
    {
      id: 2,
      title: 'Transparencia en Contratación Pública',
      description: 'Nuevas medidas para aumentar la transparencia en los procesos de contratación del estado.',
      category: 'Transparencia',
      status: 'live',
      participants: 856,
      startTime: '15:30',
      duration: '90 minutos',
      moderator: 'Dra. Ana Vargas',
      sides: { pro: 634, con: 156, neutral: 66 }
    },
    {
      id: 3,
      title: 'Educación Digital Post-Pandemia',
      description: '¿Cuál debería ser el futuro de la educación digital en Colombia después de la pandemia?',
      category: 'Educación',
      status: 'scheduled',
      participants: 0,
      startTime: '17:00',
      duration: '2 horas',
      moderator: 'Prof. Luis García',
      sides: { pro: 0, con: 0, neutral: 0 }
    }
  ];

  const debateArguments: Argument[] = [
    {
      id: 1,
      author: 'María González',
      position: 'pro',
      content: 'El voto electrónico aumentaría significativamente la participación ciudadana, especialmente entre los jóvenes que están más familiarizados con la tecnología. Además, reduciría costos operativos a largo plazo.',
      timestamp: '14:15',
      votes: 45,
      replies: 8
    },
    {
      id: 2,
      author: 'Carlos Ruiz',
      position: 'con',
      content: 'Los riesgos de seguridad cibernética son demasiado altos. Un ataque exitoso podría comprometer la integridad de todo el proceso electoral. Necesitamos más tiempo para desarrollar sistemas verdaderamente seguros.',
      timestamp: '14:22',
      votes: 38,
      replies: 12
    },
    {
      id: 3,
      author: 'Ana Martínez',
      position: 'neutral',
      content: 'Propongo una implementación gradual: comenzar con elecciones locales y evaluar resultados antes de expandir a elecciones nacionales. Esto nos permitiría ajustar el sistema según sea necesario.',
      timestamp: '14:28',
      votes: 52,
      replies: 6
    }
  ];

  const currentDebate = debates.find(d => d.id === selectedDebate);

  const handleSubmitArgument = (e: React.FormEvent) => {
    e.preventDefault();
    if (newArgument.trim()) {
      // In a real app, this would submit to the backend
      console.log('New argument:', { content: newArgument, position: selectedPosition });
      setNewArgument('');
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'pro': return 'text-green-600 bg-green-50 border-green-200';
      case 'con': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPositionLabel = (position: string) => {
    switch (position) {
      case 'pro': return 'A Favor';
      case 'con': return 'En Contra';
      case 'neutral': return 'Neutral';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            🗣️ Plataforma de Debates Ciudadanos
            <span className="ml-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">EN VIVO</span>
          </h1>
          <p className="text-lg text-gray-600">
            Participa en debates constructivos sobre temas importantes para Colombia.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Debates Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Debates Activos</h2>
            
            <div className="space-y-4">
              {debates.map((debate) => (
                <button
                  key={debate.id}
                  onClick={() => setSelectedDebate(debate.id)}
                  className={`w-full text-left p-4 rounded-lg border transition ${
                    selectedDebate === debate.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      debate.status === 'live' ? 'bg-red-100 text-red-800' :
                      debate.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {debate.status === 'live' ? '🔴 EN VIVO' :
                       debate.status === 'scheduled' ? '📅 PROGRAMADO' :
                       '✅ CERRADO'}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-sm text-gray-800 mb-1">
                    {debate.title}
                  </h3>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>{debate.category}</p>
                    <p>{debate.participants} participantes</p>
                    <p>{debate.startTime} • {debate.duration}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Debate Guidelines */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 text-sm mb-2">📋 Reglas del Debate</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Mantén un tono respetuoso</li>
                <li>• Argumenta con datos y fuentes</li>
                <li>• Escucha otras perspectivas</li>
                <li>• Evita ataques personales</li>
                <li>• Reporta contenido inapropiado</li>
              </ul>
            </div>
          </div>

          {/* Main Debate Area */}
          <div className="lg:col-span-3 space-y-6">
            {currentDebate && (
              <>
                {/* Debate Header */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {currentDebate.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{currentDebate.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span>👨‍🏫 Moderador: {currentDebate.moderator}</span>
                        <span>⏰ {currentDebate.startTime} • {currentDebate.duration}</span>
                        <span>👥 {currentDebate.participants} participantes</span>
                      </div>
                    </div>
                  </div>

                  {/* Position Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{currentDebate.sides.pro}</div>
                      <div className="text-sm text-green-800">A Favor</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{currentDebate.sides.neutral}</div>
                      <div className="text-sm text-blue-800">Neutral</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-2xl font-bold text-red-600">{currentDebate.sides.con}</div>
                      <div className="text-sm text-red-800">En Contra</div>
                    </div>
                  </div>
                </div>

                {/* Add Argument Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Agregar tu Argumento</h3>
                  
                  <form onSubmit={handleSubmitArgument} className="space-y-4">
                    {/* Position Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selecciona tu posición:
                      </label>
                      <div className="flex space-x-4">
                        {[
                          { value: 'pro', label: 'A Favor', color: 'green' },
                          { value: 'neutral', label: 'Neutral', color: 'blue' },
                          { value: 'con', label: 'En Contra', color: 'red' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="position"
                              value={option.value}
                              checked={selectedPosition === option.value}
                              onChange={(e) => setSelectedPosition(e.target.value as 'pro' | 'con' | 'neutral')}
                              className="mr-2"
                            />
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                              selectedPosition === option.value
                                ? `bg-${option.color}-100 text-${option.color}-800 border-${option.color}-300`
                                : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}>
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Argument Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tu argumento:
                      </label>
                      <textarea
                        value={newArgument}
                        onChange={(e) => setNewArgument(e.target.value)}
                        placeholder="Escribe tu argumento de manera clara y respetuosa. Incluye datos o fuentes si es posible..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!newArgument.trim()}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Publicar Argumento
                    </button>
                  </form>
                </div>

                {/* Arguments List */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    💭 Argumentos del Debate
                    <span className="ml-2 text-sm text-gray-600">({debateArguments.length} argumentos)</span>
                  </h3>

                  <div className="space-y-4">
                    {debateArguments.map((argument) => (
                      <div
                        key={argument.id}
                        className={`p-4 rounded-lg border ${getPositionColor(argument.position)}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-800">{argument.author}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPositionColor(argument.position)}`}>
                              {getPositionLabel(argument.position)}
                            </span>
                            <span className="text-xs text-gray-500">{argument.timestamp}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">{argument.content}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                              <span>👍</span>
                              <span className="text-sm">{argument.votes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition">
                              <span>💬</span>
                              <span className="text-sm">{argument.replies}</span>
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 transition text-sm">
                              Responder
                            </button>
                          </div>
                          <button className="text-gray-400 hover:text-red-600 transition text-sm">
                            🚩 Reportar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebatePage;