import React, { useEffect, useState } from "react";
import ModernLayout from "../components/ModernLayout";
import { LabCard } from "../components/ModernCard";
import ModernLoading from "../components/ModernLoading";
import { apiService } from '../services/api.service';

const Home = () => {
  const [laboratorios, setLaboratorios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaboratorios = async () => {
      try {
        const response = await apiService.getLaboratorios();
        if (!response.ok) {
          throw new Error("No se pudieron cargar los laboratorios");
        }
        const data = await response.json();
        setLaboratorios(data);
      } catch (error) {
        console.error("Error al cargar los laboratorios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaboratorios();
  }, []);

  if (loading) {
    return (
      <ModernLayout title="Laboratorios">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-64 rounded-2xl" />
          ))}
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout title="Laboratorios">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-6">
          Laboratorios de <span className="text-primary">Innovación</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
          Explora nuestros espacios de aprendizaje práctico equipados con tecnología de última generación.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm text-text-secondary">4 Laboratorios</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-text-secondary">24/7 Disponibles</span>
          </div>
        </div>
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {laboratorios.map((lab, index) => (
          <div 
            key={lab.id} 
            className="cursor-pointer"
            onClick={() => window.location.hash = `/detalle-laboratorio/${lab.id}`}
          >
            <LabCard lab={lab} />
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface p-6 rounded-2xl text-center">
          <div className="text-4xl font-bold text-primary mb-2">15+</div>
          <div className="text-text-secondary">Cursos</div>
        </div>
        <div className="bg-surface p-6 rounded-2xl text-center">
          <div className="text-4xl font-bold text-success mb-2">500+</div>
          <div className="text-text-secondary">Estudiantes</div>
        </div>
        <div className="bg-surface p-6 rounded-2xl text-center">
          <div className="text-4xl font-bold text-accent mb-2">98%</div>
          <div className="text-text-secondary">Satisfacción</div>
        </div>
      </div>
    </ModernLayout>
  );
};

export default Home;