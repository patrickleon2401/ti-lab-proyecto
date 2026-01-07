import React, { useState, useEffect } from 'react';
import { Laboratory } from '../types';
import { apiService } from '../services/api.service';
import { ENDPOINTS } from '../constants/endpoints';
import LaboratoryCard from '../components/LaboratoryCard';

const HomePage: React.FC = () => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaboratories = async () => {
      try {
        const response = await apiService.get(ENDPOINTS.LABORATORIOS);
        const data = await response.json();
        setLaboratories(data);
      } catch (err) {
        setError('Error al cargar los laboratorios');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="loading mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando laboratorios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-4">Laboratorios de Sistemas TI</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Explora nuestros laboratorios equipados con tecnología de punta para el aprendizaje práctico en informática y redes.
          </p>
        </div>
      </div>

      {/* Laboratories Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nuestros Laboratorios</h2>
          <span className="text-sm text-gray-500">
            {laboratories.length} laboratorios disponibles
          </span>
        </div>

        {laboratories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay laboratorios disponibles</h3>
            <p className="text-gray-600">No se encontraron laboratorios en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laboratories.map((lab) => (
              <LaboratoryCard key={lab.id} laboratory={lab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;