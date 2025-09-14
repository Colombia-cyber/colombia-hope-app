import React, { useState } from 'react';
import PollsWidget from '../components/PollsWidget';

interface Survey {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'closed' | 'upcoming';
  participants: number;
  deadline: string;
  questions: number;
}

function SurveyPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const surveys: Survey[] = [
    {
      id: 1,
      title: 'Transparencia en Instituciones Públicas 2024',
      description: 'Evalúa la efectividad de las medidas de transparencia implementadas en el gobierno durante este año.',
      category: 'Transparencia',
      status: 'active',
      participants: 8947,
      deadline: '15 de Febrero, 2024',
      questions: 25
    },
    {
      id: 2,
      title: 'Prioridades en Educación Digital',
      description: 'Ayuda a definir las prioridades para el desarrollo de la educación digital en Colombia.',
      category: 'Educación',
      status: 'active',
      participants: 6543,
      deadline: '28 de Febrero, 2024',
      questions: 18
    },
    {
      id: 3,
      title: 'Seguridad Ciudadana en Zonas Urbanas',
      description: 'Comparte tu experiencia y opiniones sobre la seguridad en las principales ciudades del país.',
      category: 'Seguridad',
      status: 'active',
      participants: 12456,
      deadline: '10 de Marzo, 2024',
      questions: 30
    },
    {
      id: 4,
      title: 'Participación Ciudadana Digital - Evaluación',
      description: 'Evalúa el impacto de las plataformas digitales en la participación ciudadana.',
      category: 'Democracia',
      status: 'upcoming',
      participants: 0,
      deadline: '1 de Abril, 2024',
      questions: 22
    },
    {
      id: 5,
      title: 'Políticas Ambientales y Sostenibilidad',
      description: 'Resultados de la encuesta sobre políticas ambientales implementadas el año pasado.',
      category: 'Ambiente',
      status: 'closed',
      participants: 15678,
      deadline: '31 de Diciembre, 2023',
      questions: 35
    }
  ];

  const categories = ['all', 'Transparencia', 'Educación', 'Seguridad', 'Democracia', 'Ambiente'];

  const filteredSurveys = activeCategory === 'all' 
    ? surveys 
    : surveys.filter(survey => survey.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'closed': return 'Cerrada';
      case 'upcoming': return 'Próximamente';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            📊 Centro de Encuestas y Pulsos Ciudadanos
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Participa en encuestas oficiales y ayuda a dar forma a las políticas públicas de Colombia.
          </p>
          
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600">47,624</div>
              <div className="text-sm text-gray-600">Participantes Activos</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">Encuestas Activas</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-sm text-gray-600">Tasa de Finalización</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <div className="text-2xl font-bold text-orange-600">342</div>
              <div className="text-sm text-gray-600">Políticas Influenciadas</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filtrar por Categoría</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'Todas' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Surveys List */}
            <div className="space-y-6">
              {filteredSurveys.map((survey) => (
                <div key={survey.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{survey.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(survey.status)}`}>
                          {getStatusText(survey.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{survey.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Categoría:</span>
                      <div className="text-blue-600">{survey.category}</div>
                    </div>
                    <div>
                      <span className="font-medium">Participantes:</span>
                      <div className="text-green-600">{survey.participants.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Preguntas:</span>
                      <div className="text-purple-600">{survey.questions}</div>
                    </div>
                    <div>
                      <span className="font-medium">Fecha límite:</span>
                      <div className="text-orange-600">{survey.deadline}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>⏱️ Tiempo estimado: {Math.ceil(survey.questions * 0.5)} minutos</span>
                    </div>
                    
                    {survey.status === 'active' && (
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Participar Ahora
                      </button>
                    )}
                    
                    {survey.status === 'closed' && (
                      <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
                        Ver Resultados
                      </button>
                    )}
                    
                    {survey.status === 'upcoming' && (
                      <button className="bg-yellow-100 text-yellow-800 px-6 py-2 rounded-lg cursor-not-allowed">
                        Próximamente
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Polls Widget */}
            <PollsWidget />

            {/* Quick Survey */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                ⚡ Encuesta Rápida
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    ¿Cómo calificarías la facilidad de uso de esta plataforma?
                  </p>
                  <div className="space-y-2">
                    {['Excelente', 'Buena', 'Regular', 'Mala'].map((option, index) => (
                      <label key={index} className="flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="quick-survey" 
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    Enviar Respuesta
                  </button>
                </div>
              </div>
            </div>

            {/* Rewards Program */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                🏆 Programa de Reconocimiento
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-800 text-sm">Ciudadano Participativo</p>
                    <p className="text-xs text-yellow-600">Completar 5 encuestas</p>
                  </div>
                  <span className="text-yellow-600">🥉</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-700 text-sm">Experto en Política</p>
                    <p className="text-xs text-gray-600">Completar 15 encuestas</p>
                  </div>
                  <span className="text-gray-600">🥈</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-700 text-sm">Líder Democrático</p>
                    <p className="text-xs text-gray-600">Completar 30 encuestas</p>
                  </div>
                  <span className="text-gray-600">🥇</span>
                </div>
              </div>
            </div>

            {/* Survey Guidelines */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                📋 Guía de Participación
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Lee cuidadosamente cada pregunta</p>
                <p>• Responde con honestidad y precisión</p>
                <p>• Todas las respuestas son confidenciales</p>
                <p>• Puedes pausar y retomar más tarde</p>
                <p>• Los resultados son públicos y transparentes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurveyPage;