import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">Colombia Hope</h3>
            <p className="text-gray-400 text-sm">
              Construyendo una democracia más participativa y transparente para todos los colombianos.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition">
                  Chat
                </Link>
              </li>
              <li>
                <Link to="/debate" className="text-gray-400 hover:text-white transition">
                  Debates
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition">
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Participation */}
          <div>
            <h4 className="font-semibold mb-4">Participación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/survey" className="text-gray-400 hover:text-white transition">
                  Encuestas
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Propuestas Ciudadanas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Consultas Públicas
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Peticiones
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Colombia Hope. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;