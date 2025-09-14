import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🇨🇴</span>
              <h3 className="text-xl font-bold">Colombia Hope</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Construyendo una democracia más participativa y transparente para todos los colombianos.
            </p>
            <div className="mt-4 flex space-x-4">
              <div className="text-yellow-400">⭐</div>
              <div className="text-blue-400">⭐</div>
              <div className="text-red-400">⭐</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">🏠 Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-300 hover:text-yellow-400 transition">
                  Chat Ciudadano
                </Link>
              </li>
              <li>
                <Link to="/legislation" className="text-gray-300 hover:text-yellow-400 transition">
                  Seguimiento Legislativo
                </Link>
              </li>
              <li>
                <Link to="/congress" className="text-gray-300 hover:text-yellow-400 transition">
                  Congreso en Vivo
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-yellow-400 transition">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-300 hover:text-yellow-400 transition">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Participation */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">📊 Participación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/survey" className="text-gray-300 hover:text-blue-400 transition">
                  Encuestas y Pulsos
                </Link>
              </li>
              <li>
                <Link to="/debate" className="text-gray-300 hover:text-blue-400 transition">
                  Debates Ciudadanos
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                  Propuestas Ciudadanas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                  Consultas Públicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                  Peticiones
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-red-400">🛡️ Soporte & Seguridad</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition">
                  Reportar Problema
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-400 transition">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Colombia Hope - Plataforma Oficial de Participación Ciudadana Digital</p>
              <p className="text-xs mt-1">República de Colombia 🇨🇴 • Gobierno Digital • Democracia Participativa</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-400">🟢</span>
              <span className="text-xs">Sistema Operativo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;