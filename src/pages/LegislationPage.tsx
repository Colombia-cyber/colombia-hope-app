import React from 'react';

const LegislationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            📋 Seguimiento Legislativo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Mantente informado sobre las propuestas de ley, debates y procesos legislativos en el Congreso de Colombia.
          </p>
          
          {/* Legislative Feed */}
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Proyecto de Ley 125 - Participación Ciudadana Digital
              </h3>
              <p className="text-gray-700 mb-3">
                Nueva propuesta para fortalecer los mecanismos de participación ciudadana a través de plataformas digitales.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Estado: En debate</span>
                <span>Comisión: Primera Constitucional</span>
                <span>Fecha: 15 de Enero, 2024</span>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Proyecto de Ley 098 - Transparencia Gubernamental
              </h3>
              <p className="text-gray-700 mb-3">
                Iniciativa para mejorar la transparencia en las instituciones públicas y facilitar el acceso a la información.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Estado: Aprobado Primera Vuelta</span>
                <span>Comisión: Sexta Constitucional</span>
                <span>Fecha: 10 de Enero, 2024</span>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                Proyecto de Ley 087 - Educación Digital
              </h3>
              <p className="text-gray-700 mb-3">
                Propuesta para modernizar el sistema educativo con tecnología digital y acceso universal a internet.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Estado: En revisión</span>
                <span>Comisión: Sexta Constitucional</span>
                <span>Fecha: 8 de Enero, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegislationPage;