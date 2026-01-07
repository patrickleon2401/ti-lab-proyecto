import React from 'react';

const PageOne: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Page One</h1>
          <p className="text-slate-600">Ejemplo de página con contenido estructurado</p>
        </div>
        
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Características del Layout</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-900">Sidebar fijo</span>
                <p className="text-slate-600 text-sm">Navegación persistente en desktop con íconos claros</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-900">Área de contenido fluida</span>
                <p className="text-slate-600 text-sm">Espacio principal adaptable para diferentes contenidos</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium text-slate-900">Diseño consistente</span>
                <p className="text-slate-600 text-sm">Paleta de colores unificada y espaciado regular</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-2">Tecnologías</h3>
            <div className="space-y-1 text-sm text-slate-600">
              <div>React 18</div>
              <div>TypeScript</div>
              <div>Tailwind CSS</div>
              <div>React Router</div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-2">Herramientas</h3>
            <div className="space-y-1 text-sm text-slate-600">
              <div>Vite</div>
              <div>ESLint</div>
              <div>Lucide Icons</div>
              <div>PostCSS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;