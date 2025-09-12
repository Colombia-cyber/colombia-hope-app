import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Colombia Hope App</h3>
            <p className="text-gray-300 text-sm">
              Conectando ciudadanos con la democracia colombiana a través de la tecnología.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Funcionalidades</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/chat" className="hover:text-white">Chat Ciudadano</a></li>
              <li><a href="/news" className="hover:text-white">Noticias</a></li>
              <li><a href="/legislation" className="hover:text-white">Legislación</a></li>
              <li><a href="/congress" className="hover:text-white">Congreso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Participación</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/debate" className="hover:text-white">Debates</a></li>
              <li><a href="/survey" className="hover:text-white">Encuestas</a></li>
              <li><a href="/analytics" className="hover:text-white">Análisis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Ayuda</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
              <li><a href="#" className="hover:text-white">Términos</a></li>
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Colombia Hope App. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer