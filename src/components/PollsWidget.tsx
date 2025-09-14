import React, { useState } from 'react';

interface Poll {
  id: number;
  question: string;
  options: Array<{
    text: string;
    votes: number;
    percentage: number;
  }>;
  totalVotes: number;
  timeLeft: string;
  category: string;
}

const PollsWidget: React.FC = () => {
  const [selectedPoll, setSelectedPoll] = useState(0);
  const [hasVoted, setHasVoted] = useState<number[]>([]);

  const polls: Poll[] = [
    {
      id: 1,
      question: "¿Cree que la participación ciudadana digital mejora la democracia?",
      options: [
        { text: "Sí, definitivamente", votes: 3425, percentage: 78 },
        { text: "No estoy seguro", votes: 658, percentage: 15 },
        { text: "No, para nada", votes: 307, percentage: 7 }
      ],
      totalVotes: 4390,
      timeLeft: "2 días",
      category: "Democracia"
    },
    {
      id: 2,
      question: "¿Cuál debería ser la prioridad en educación para 2024?",
      options: [
        { text: "Tecnología e internet", votes: 2156, percentage: 45 },
        { text: "Infraestructura física", votes: 1678, percentage: 35 },
        { text: "Capacitación docente", votes: 956, percentage: 20 }
      ],
      totalVotes: 4790,
      timeLeft: "5 días",
      category: "Educación"
    },
    {
      id: 3,
      question: "¿Qué medida de transparencia considera más importante?",
      options: [
        { text: "Datos públicos abiertos", votes: 1876, percentage: 52 },
        { text: "Auditorías ciudadanas", votes: 1205, percentage: 33 },
        { text: "Reportes en tiempo real", votes: 542, percentage: 15 }
      ],
      totalVotes: 3623,
      timeLeft: "1 día",
      category: "Transparencia"
    }
  ];

  const handleVote = (pollId: number, optionIndex: number) => {
    if (!hasVoted.includes(pollId)) {
      setHasVoted([...hasVoted, pollId]);
      // In a real app, this would send the vote to the backend
      console.log(`Voted for option ${optionIndex} in poll ${pollId}`);
    }
  };

  const currentPoll = polls[selectedPoll];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center">
          📊 Pulso Presidencial
        </h3>
        <div className="flex space-x-1">
          {polls.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedPoll(index)}
              className={`w-2 h-2 rounded-full transition ${
                selectedPoll === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {currentPoll.category}
          </span>
          <span className="text-xs text-gray-500">
            ⏰ {currentPoll.timeLeft} restantes
          </span>
        </div>
        
        <h4 className="text-md font-semibold text-gray-800 mb-4">
          {currentPoll.question}
        </h4>
      </div>

      <div className="space-y-3 mb-4">
        {currentPoll.options.map((option, index) => (
          <div key={index}>
            <button
              onClick={() => handleVote(currentPoll.id, index)}
              disabled={hasVoted.includes(currentPoll.id)}
              className={`w-full text-left p-3 rounded-lg border transition ${
                hasVoted.includes(currentPoll.id)
                  ? 'bg-gray-50 cursor-not-allowed'
                  : 'hover:bg-blue-50 hover:border-blue-300 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">
                  {option.text}
                </span>
                <span className="text-sm text-gray-600">
                  {option.percentage}%
                </span>
              </div>
              
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === 0 ? 'bg-blue-600' :
                    index === 1 ? 'bg-green-600' :
                    'bg-orange-600'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {option.votes.toLocaleString()} votos
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{currentPoll.totalVotes.toLocaleString()} votos totales</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Ver resultados detallados →
          </button>
        </div>
      </div>

      {hasVoted.includes(currentPoll.id) && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-center">
          <span className="text-green-700 text-sm font-medium">
            ✅ ¡Gracias por participar!
          </span>
        </div>
      )}
    </div>
  );
};

export default PollsWidget;