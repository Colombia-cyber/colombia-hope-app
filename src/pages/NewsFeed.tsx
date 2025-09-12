export default function NewsFeed() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">📰 Noticias y Actualizaciones</h1>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Mantente informado sobre las últimas noticias relacionadas con participación ciudadana,
            política pública y desarrollo comunitario en Colombia.
          </p>
          <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4">
            <p className="text-indigo-700">
              <strong>Próximamente:</strong> Feed personalizado de noticias con fuentes verificadas
              y sistema de notificaciones.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <article className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nueva Plataforma de Participación Ciudadana Lanzada
                </h3>
                <p className="text-sm text-gray-500">Hace 2 horas • Gobierno Nacional</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Política
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              El gobierno nacional presenta una nueva herramienta digital para facilitar 
              la participación ciudadana en la toma de decisiones públicas...
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              Leer más →
            </a>
          </article>
          
          <article className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Iniciativa Comunitaria de Reciclaje Gana Premio Nacional
                </h3>
                <p className="text-sm text-gray-500">Hace 6 horas • Medellín</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Ambiente
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              Una iniciativa ciudadana de reciclaje en Medellín ha sido reconocida 
              a nivel nacional por su impacto positivo en la comunidad...
            </p>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">
              Leer más →
            </a>
          </article>
          
          <article className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Convocatoria Abierta: Presupuesto Participativo 2024
                </h3>
                <p className="text-sm text-gray-500">Hace 1 día • Bogotá</p>
              </div>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                Participación
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              La Alcaldía de Bogotá abre la convocatoria para que los ciudadanos 
              propongan proyectos para el presupuesto participativo del próximo año...
            </p>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
              Leer más →
            </a>
          </article>
          
          <article className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Jóvenes Colombianos Proponen Reformas Educativas
                </h3>
                <p className="text-sm text-gray-500">Hace 2 días • Nacional</p>
              </div>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                Educación
              </span>
            </div>
            <p className="text-gray-700 mb-3">
              Un grupo de estudiantes universitarios presenta propuestas innovadoras 
              para mejorar el sistema educativo colombiano...
            </p>
            <a href="#" className="text-orange-600 hover:text-orange-800 font-medium">
              Leer más →
            </a>
          </article>
        </div>
      </div>
    </div>
  );
}