import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display text-text-primary font-bold mb-6">
            Laboratorios de
            <span className="text-primary"> Innovación</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Explora nuestros espacios de aprendizaje práctico equipados con tecnología 
            de última generación para desarrollar tus habilidades en sistemas y redes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center space-x-8 mt-8"
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-caption text-text-secondary">4 Laboratorios Activos</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-caption text-text-secondary">24/7 Disponibilidad</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <span className="text-caption text-text-secondary">Instructores Certificados</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Labs Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
      >
        {laboratorios.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => window.location.hash = `/detalle-laboratorio/${lab.id}`}
          >
            <LabCard lab={lab} />
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="modern-card p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">15+</div>
          <div className="text-text-secondary">Cursos Disponibles</div>
        </div>
        <div className="modern-card p-6 text-center">
          <div className="text-4xl font-bold text-success mb-2">500+</div>
          <div className="text-text-secondary">Estudiantes Activos</div>
        </div>
        <div className="modern-card p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">98%</div>
          <div className="text-text-secondary">Satisfacción</div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="modern-card p-8"
      >
        <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">
          ¿Por qué elegir LABS TI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Velocidad</h3>
            <p className="text-text-secondary text-sm">
              Aprendizaje rápido con tecnología de punta
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Seguridad</h3>
            <p className="text-text-secondary text-sm">
              Entorno seguro y supervisado
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Enfoque</h3>
            <p className="text-text-secondary text-sm">
              Metodología práctica y aplicada
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="font-semibold text-text-primary mb-2">Excelencia</h3>
            <p className="text-text-secondary text-sm">
              Estándares académicos internacionales
            </p>
          </div>
        </div>
      </motion.div>
    </ModernLayout>
  );
};

export default Home;
