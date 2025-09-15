import React, { useState } from 'react';

interface BillProgress {
  stage: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  committee?: string;
  votes?: {
    favor: number;
    against: number;
    abstention: number;
  };
}

interface CitizenImpact {
  category: string;
  description: string;
  affectedPopulation: number;
  economicImpact: string;
  timelineToEffect: string;
}

interface LegislativeBill {
  id: string;
  title: string;
  summary: string;
  author: string;
  dateIntroduced: string;
  currentStage: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  progress: BillProgress[];
  citizenImpact: CitizenImpact;
  publicSupport: {
    favor: number;
    against: number;
    neutral: number;
  };
  relatedBills: string[];
  documents: {
    name: string;
    type: string;
    date: string;
  }[];
}

const LegislationPage: React.FC = () => {
  const [selectedBill, setSelectedBill] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const bills: LegislativeBill[] = [
    {
      id: 'PL125',
      title: 'Participación Ciudadana Digital',
      summary: 'Nueva propuesta para fortalecer los mecanismos de participación ciudadana a través de plataformas digitales, garantizando transparencia y acceso universal.',
      author: 'Sen. María González',
      dateIntroduced: '2024-01-10',
      currentStage: 'Debate en Plenario',
      priority: 'high',
      category: 'Tecnología',
      progress: [
        { stage: 'Radicación', status: 'completed', date: '2024-01-10' },
        { stage: 'Primera Comisión', status: 'completed', date: '2024-01-15', committee: 'Primera Constitucional', votes: { favor: 12, against: 3, abstention: 1 } },
        { stage: 'Plenario Senado', status: 'current', committee: 'Senado' },
        { stage: 'Cámara', status: 'pending' },
        { stage: 'Sanción Presidencial', status: 'pending' }
      ],
      citizenImpact: {
        category: 'Participación Democrática',
        description: 'Facilitará la participación ciudadana en decisiones públicas a través de herramientas digitales',
        affectedPopulation: 35000000,
        economicImpact: 'Reducción de costos administrativos en $2.3B anuales',
        timelineToEffect: '6-12 meses tras aprobación'
      },
      publicSupport: { favor: 78, against: 15, neutral: 7 },
      relatedBills: ['PL098', 'PL087'],
      documents: [
        { name: 'Texto original', type: 'PDF', date: '2024-01-10' },
        { name: 'Ponencia Primera Comisión', type: 'PDF', date: '2024-01-15' },
        { name: 'Actas de debate', type: 'PDF', date: '2024-01-16' }
      ]
    },
    {
      id: 'PL098',
      title: 'Transparencia Gubernamental',
      summary: 'Iniciativa para mejorar la transparencia en las instituciones públicas y facilitar el acceso a la información ciudadana.',
      author: 'Sen. Carlos Ruiz',
      dateIntroduced: '2024-01-05',
      currentStage: 'Aprobado Primera Vuelta',
      priority: 'high',
      category: 'Transparencia',
      progress: [
        { stage: 'Radicación', status: 'completed', date: '2024-01-05' },
        { stage: 'Sexta Comisión', status: 'completed', date: '2024-01-08', committee: 'Sexta Constitucional', votes: { favor: 14, against: 2, abstention: 0 } },
        { stage: 'Plenario Senado', status: 'completed', date: '2024-01-12', votes: { favor: 87, against: 15, abstention: 6 } },
        { stage: 'Cámara', status: 'current' },
        { stage: 'Sanción Presidencial', status: 'pending' }
      ],
      citizenImpact: {
        category: 'Acceso a la Información',
        description: 'Garantiza el acceso ciudadano a información pública de manera eficiente y transparente',
        affectedPopulation: 50000000,
        economicImpact: 'Ahorro estimado de $1.8B por reducción de corrupción',
        timelineToEffect: '3-6 meses tras aprobación'
      },
      publicSupport: { favor: 85, against: 8, neutral: 7 },
      relatedBills: ['PL125'],
      documents: [
        { name: 'Texto original', type: 'PDF', date: '2024-01-05' },
        { name: 'Ponencia Sexta Comisión', type: 'PDF', date: '2024-01-08' },
        { name: 'Texto aprobado Senado', type: 'PDF', date: '2024-01-12' }
      ]
    },
    {
      id: 'PL087',
      title: 'Educación Digital Universal',
      summary: 'Propuesta para modernizar el sistema educativo con tecnología digital y garantizar acceso universal a internet en instituciones educativas.',
      author: 'Sen. Ana Martínez',
      dateIntroduced: '2024-01-03',
      currentStage: 'En revisión',
      priority: 'medium',
      category: 'Educación',
      progress: [
        { stage: 'Radicación', status: 'completed', date: '2024-01-03' },
        { stage: 'Sexta Comisión', status: 'current', committee: 'Sexta Constitucional' },
        { stage: 'Plenario Senado', status: 'pending' },
        { stage: 'Cámara', status: 'pending' },
        { stage: 'Sanción Presidencial', status: 'pending' }
      ],
      citizenImpact: {
        category: 'Educación y Tecnología',
        description: 'Modernizará la educación pública con acceso universal a tecnología digital',
        affectedPopulation: 12000000,
        economicImpact: 'Inversión de $5.2B en infraestructura educativa',
        timelineToEffect: '12-24 meses tras aprobación'
      },
      publicSupport: { favor: 72, against: 18, neutral: 10 },
      relatedBills: ['PL125'],
      documents: [
        { name: 'Texto original', type: 'PDF', date: '2024-01-03' },
        { name: 'Estudios de impacto', type: 'PDF', date: '2024-01-05' }
      ]
    }
  ];

  const categories = ['all', 'Tecnología', 'Transparencia', 'Educación', 'Salud', 'Economía'];

  const filteredBills = filterCategory === 'all' 
    ? bills 
    : bills.filter(bill => bill.category === filterCategory);

  const sortedBills = [...filteredBills].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'date') {
      return new Date(b.dateIntroduced).getTime() - new Date(a.dateIntroduced).getTime();
    }
    if (sortBy === 'support') {
      return b.publicSupport.favor - a.publicSupport.favor;
    }
    return 0;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageProgress = (progress: BillProgress[]) => {
    const completed = progress.filter(p => p.status === 'completed').length;
    return Math.round((completed / progress.length) * 100);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📋 Seguimiento Legislativo Integral
              </h1>
              <p className="text-lg text-gray-600">
                Mantente informado sobre las propuestas de ley, debates, procesos legislativos y su impacto ciudadano.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Proyectos activos</div>
              <div className="text-2xl font-bold text-blue-600">{bills.length}</div>
              <div className="text-sm text-gray-500">En proceso</div>
            </div>
          </div>
          
          {/* Enhanced Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filterCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Todas las categorías' : category}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm"
                >
                  <option value="priority">Prioridad</option>
                  <option value="date">Fecha de introducción</option>
                  <option value="support">Apoyo ciudadano</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                {filteredBills.length} proyectos encontrados
              </div>
            </div>
          </div>
          
          {/* Bills Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {sortedBills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-blue-600">{bill.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(bill.priority)}`}>
                        {bill.priority === 'high' ? 'Alta prioridad' : 
                         bill.priority === 'medium' ? 'Prioridad media' : 'Baja prioridad'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{bill.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{bill.summary}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso legislativo</span>
                    <span className="text-sm text-gray-500">{getStageProgress(bill.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${getStageProgress(bill.progress)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Estado actual: {bill.currentStage}</div>
                </div>

                {/* Citizen Impact Preview */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💫 Impacto Ciudadano</h4>
                  <p className="text-sm text-gray-700 mb-2">{bill.citizenImpact.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Población afectada:</span>
                      <div className="font-medium">{(bill.citizenImpact.affectedPopulation / 1000000).toFixed(1)}M ciudadanos</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Implementación:</span>
                      <div className="font-medium">{bill.citizenImpact.timelineToEffect}</div>
                    </div>
                  </div>
                </div>

                {/* Public Support */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Apoyo ciudadano</span>
                    <span className="text-sm text-green-600 font-medium">{bill.publicSupport.favor}% a favor</span>
                  </div>
                  <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500"
                      style={{ width: `${bill.publicSupport.favor}%` }}
                    ></div>
                    <div 
                      className="bg-red-500"
                      style={{ width: `${bill.publicSupport.against}%` }}
                    ></div>
                    <div 
                      className="bg-gray-400"
                      style={{ width: `${bill.publicSupport.neutral}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>A favor: {bill.publicSupport.favor}%</span>
                    <span>En contra: {bill.publicSupport.against}%</span>
                    <span>Neutral: {bill.publicSupport.neutral}%</span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Por: {bill.author}</span>
                  <span>{new Date(bill.dateIntroduced).toLocaleDateString('es-CO')}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBill(selectedBill === bill.id ? null : bill.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    {selectedBill === bill.id ? 'Ocultar detalles' : 'Ver detalles completos'} →
                  </button>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Detailed Information (Expandable) */}
                {selectedBill === bill.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                    {/* Detailed Progress */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">📋 Progreso Detallado</h4>
                      <div className="space-y-3">
                        {bill.progress.map((stage, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              stage.status === 'completed' ? 'bg-green-500 border-green-500' :
                              stage.status === 'current' ? 'bg-yellow-500 border-yellow-500 animate-pulse' :
                              'bg-gray-200 border-gray-300'
                            }`}></div>
                            <div className="flex-1">
                              <div className={`font-medium ${stage.status === 'current' ? 'text-gray-800' : 'text-gray-600'}`}>
                                {stage.stage}
                              </div>
                              {stage.committee && (
                                <div className="text-sm text-gray-500">{stage.committee}</div>
                              )}
                              {stage.votes && (
                                <div className="text-sm text-gray-500">
                                  Votación: {stage.votes.favor} a favor, {stage.votes.against} en contra, {stage.votes.abstention} abstenciones
                                </div>
                              )}
                            </div>
                            {stage.date && (
                              <div className="text-sm text-gray-500">{new Date(stage.date).toLocaleDateString('es-CO')}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Impact */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">💡 Análisis de Impacto</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div>
                          <span className="font-medium text-gray-700">Categoría: </span>
                          <span className="text-gray-600">{bill.citizenImpact.category}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Impacto económico: </span>
                          <span className="text-gray-600">{bill.citizenImpact.economicImpact}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Población beneficiada: </span>
                          <span className="text-gray-600">{bill.citizenImpact.affectedPopulation.toLocaleString()} ciudadanos</span>
                        </div>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">📄 Documentos</h4>
                      <div className="space-y-2">
                        {bill.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.type} • {new Date(doc.date).toLocaleDateString('es-CO')}</div>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Descargar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Bills */}
                    {bill.relatedBills.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">🔗 Proyectos Relacionados</h4>
                        <div className="flex flex-wrap gap-2">
                          {bill.relatedBills.map((relatedId) => (
                            <span key={relatedId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {relatedId}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegislationPage;