import React, { useState, useEffect } from 'react';
import { Laboratory } from '../types';
import { apiService } from '../services/api.service';
import { ENDPOINTS } from '../constants/endpoints';
import { useNavigate } from 'react-router-dom';
import './styles/LaboratoryCard.css';

interface LaboratoryCardProps {
  laboratory: Laboratory;
}

const LaboratoryCard: React.FC<LaboratoryCardProps> = ({ laboratory }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/detalle-laboratorio/${laboratory.id}`);
  };

  return (
    <div className="lab-card" onClick={handleClick}>
      <div className="lab-card-image">
        {!imageError ? (
          <img
            src={laboratory.foto1}
            alt={laboratory.nombre}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="image-placeholder">
            <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="lab-card-content">
        <h3 className="lab-card-title">{laboratory.nombre}</h3>
        <p className="lab-card-description">{laboratory.descripcion}</p>
        
        <div className="lab-card-footer">
          <button className="btn btn-primary w-full">
            Ver Detalles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryCard;