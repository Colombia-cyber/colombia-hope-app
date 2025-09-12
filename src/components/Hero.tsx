import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Colombia Hope App
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Una plataforma de participación ciudadana para construir el futuro de Colombia
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
          <Link
            to="/chat"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-semibold mb-2">Chat</h3>
            <p className="text-sm opacity-90">Conversaciones comunitarias</p>
          </Link>
          <Link
            to="/debate"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all"
          >
            <div className="text-4xl mb-4">🗣️</div>
            <h3 className="text-lg font-semibold mb-2">Debate</h3>
            <p className="text-sm opacity-90">Discusiones públicas</p>
          </Link>
          <Link
            to="/survey"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Encuestas</h3>
            <p className="text-sm opacity-90">Tu opinión cuenta</p>
          </Link>
          <Link
            to="/news"
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/20 transition-all"
          >
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-lg font-semibold mb-2">Noticias</h3>
            <p className="text-sm opacity-90">Mantente informado</p>
          </Link>
        </div>
      </div>
    </div>
  );
}