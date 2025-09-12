import React from 'react'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Colombia Hope App
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">Inicio</Link>
            <Link to="/chat" className="hover:text-blue-200">Chat</Link>
            <Link to="/news" className="hover:text-blue-200">Noticias</Link>
            <Link to="/legislation" className="hover:text-blue-200">Legislación</Link>
            <Link to="/congress" className="hover:text-blue-200">Congreso</Link>
            <Link to="/analytics" className="hover:text-blue-200">Análisis</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar