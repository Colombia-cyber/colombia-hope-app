import React from 'react'

const PollsWidget: React.FC = () => {
  const polls = [
    {
      question: '¿Apoyas la nueva reforma tributaria?',
      options: [
        { text: 'Sí', percentage: 35 },
        { text: 'No', percentage: 45 },
        { text: 'No estoy seguro', percentage: 20 },
      ],
      totalVotes: 2847,
    },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Encuesta Activa</h3>
      {polls.map((poll, index) => (
        <div key={index}>
          <p className="font-medium mb-4">{poll.question}</p>
          <div className="space-y-2">
            {poll.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center justify-between">
                <span className="text-sm">{option.text}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{option.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            {poll.totalVotes} votos totales
          </p>
        </div>
      ))}
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Votar
      </button>
    </div>
  )
}

export default PollsWidget