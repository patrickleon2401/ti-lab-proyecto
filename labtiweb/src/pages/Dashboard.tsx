import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Bienvenido al frontend base con React + TypeScript + Tailwind</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-blue-600 font-semibold text-xl">01</div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Componentes Reutilizables</h3>
            <p className="text-slate-600 text-sm">Arquitectura modular con componentes limpios y reutilizables.</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-green-600 font-semibold text-xl">02</div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Responsive Design</h3>
            <p className="text-slate-600 text-sm">Diseño totalmente adaptable con Tailwind CSS.</p>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-purple-600 font-semibold text-xl">03</div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">TypeScript</h3>
            <p className="text-slate-600 text-sm">Tipado estático para mayor robustez y mantenimiento.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;