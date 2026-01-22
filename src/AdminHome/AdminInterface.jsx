// components/AdminInterface.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { apiService } from '../services/api.service.js';

const AdminInterface = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('laboratorios');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Verificación de seguridad: solo permitir acceso si hay sesión de admin
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      // No hay sesión, redirigir al Home
      navigate('/', { replace: true });
      return;
    }
    
    try {
      const usuario = JSON.parse(storedUser);
      if (!usuario || usuario.rol !== 'admin') {
        // No es admin, redirigir al Home
        navigate('/', { replace: true });
        return;
      }
    } catch (error) {
      console.error("Error al parsear usuario desde localStorage:", error);
      localStorage.removeItem('usuario');
      navigate('/', { replace: true });
      return;
    }
  }, [navigate]);

  // Cargar datos según la tab activa
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      let response;
      switch (activeTab) {
        case 'laboratorios':
          response = await apiService.getLaboratorios();
          break;
        case 'cursos':
          response = await apiService.getCursos();
          break;
        case 'componentes':
          response = await apiService.getComponentes();
          break;
        case 'materiales':
          response = await apiService.getMateriales();
          break;
        default:
          return;
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setMessage('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setMessage('');
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    setSaving(true);
    setMessage('');
    
    try {
      let response;
      let result;
      
      if (editingItem.id) {
        // Modo edición
        switch (activeTab) {
          case 'laboratorios':
            response = await apiService.updateLaboratorio(editingItem.id, editingItem);
            break;
          case 'cursos':
            response = await apiService.updateCurso(editingItem.id, editingItem);
            break;
          case 'componentes':
            response = await apiService.updateComponente(editingItem.id, editingItem);
            break;
          case 'materiales':
            response = await apiService.updateMaterial(editingItem.id, editingItem);
            break;
          default:
            return;
        }
        
        if (response.ok) {
          result = await response.json();
          
          // Actualizar lista local
          setData(data.map(item => 
            item.id === editingItem.id ? editingItem : item
          ));
          
          setEditingItem(null);
          setMessage(`✅ ${result.message || 'Cambios guardados correctamente'}`);
        } else {
          const errorData = await response.json();
          setMessage(`❌ ${errorData.error || 'Error al guardar cambios'}`);
        }
      } else {
        // Modo creación
        switch (activeTab) {
          case 'laboratorios':
            response = await apiService.createLaboratorio(editingItem);
            break;
          case 'cursos':
            response = await apiService.createCurso(editingItem);
            break;
          case 'componentes':
            response = await apiService.createComponente(editingItem);
            break;
          case 'materiales':
            response = await apiService.createMaterial(editingItem);
            break;
          default:
            return;
        }
        
        if (response.ok) {
          result = await response.json();
          
          // Recargar lista para obtener el nuevo item con ID
          await loadData();
          
          setEditingItem(null);
          setMessage(`✅ ${result.message || 'Creado correctamente'}`);
        } else {
          const errorData = await response.json();
          setMessage(`❌ ${errorData.error || 'Error al crear'}`);
        }
      }
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      setMessage('❌ Error de conexión al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setMessage('');
  };

  const handleInputChange = (field, value) => {
    setEditingItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogout = () => {
    // Limpiar completamente la sesión del localStorage
    localStorage.removeItem('usuario');
    
    // Redirigir al Home
    navigate('/', { replace: true });
  };

  const handleLogoutMouseEnter = (e) => {
    e.target.style.backgroundColor = '#E68500'; // Naranja más oscuro
  };

  const handleLogoutMouseLeave = (e) => {
    e.target.style.backgroundColor = '#FF9500'; // Naranja original
  };

  const renderTabs = () => (
    <div style={styles.tabs}>
      {['laboratorios', 'cursos', 'componentes', 'materiales'].map(tab => (
        <button
          key={tab}
          style={{
            ...styles.tab,
            ...(activeTab === tab ? styles.tabActive : {})
          }}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderForm = () => {
    if (!editingItem) return null;

    const renderField = (field, label, type = 'text') => (
      <div style={styles.field}>
        <label style={styles.label}>{label}:</label>
        <input
          type={type}
          value={editingItem[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          style={styles.input}
        />
      </div>
    );

    const isEditMode = !!editingItem.id;

    return (
      <div style={styles.formOverlay}>
        <div style={styles.form}>
          <h3 style={styles.formTitle}>
            {isEditMode ? 'Editar' : 'Crear'} {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
          </h3>
          
          {activeTab === 'laboratorios' && (
            <>
              {renderField('nombre', 'Nombre')}
              {renderField('titulo', 'Título')}
              {renderField('descripcion', 'Descripción')}
              {renderField('foto1', 'Imagen 1 (URL)')}
              {renderField('foto2', 'Imagen 2 (URL)')}
              {renderField('foto3', 'Imagen 3 (URL)')}
            </>
          )}
          
          {activeTab === 'cursos' && (
            <>
              {renderField('nombre', 'Nombre')}
              {renderField('nivel_curso', 'Nivel')}
              {renderField('descripcion', 'Descripción')}
              {renderField('foto1', 'Imagen 1 (URL)')}
              {renderField('foto2', 'Imagen 2 (URL)')}
            </>
          )}
          
          {activeTab === 'componentes' && (
            <>
              {renderField('nombre', 'Nombre')}
              {renderField('descripcion', 'Descripción')}
              {renderField('foto1', 'Imagen 1 (URL)')}
              {renderField('foto2', 'Imagen 2 (URL)')}
              {renderField('foto3', 'Imagen 3 (URL)')}
              {renderField('laboratorio_id', 'ID Laboratorio')}
            </>
          )}
          
          {activeTab === 'materiales' && (
            <>
              {renderField('nombre', 'Nombre')}
              {renderField('url', 'URL del PDF')}
              {renderField('curso_id', 'ID Curso')}
            </>
          )}
          
          <div style={styles.formButtons}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                ...styles.button,
                ...styles.saveButton,
                ...(saving ? styles.buttonDisabled : {})
              }}
            >
              {saving ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear')}
            </button>
            <button
              onClick={handleCancel}
              style={{
                ...styles.button,
                ...styles.cancelButton
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${item.nombre}"?`)) {
      return;
    }
    
    try {
      let response;
      let result;
      
      switch (activeTab) {
        case 'laboratorios':
          response = await apiService.deleteLaboratorio(item.id);
          break;
        case 'cursos':
          response = await apiService.deleteCurso(item.id);
          break;
        case 'componentes':
          response = await apiService.deleteComponente(item.id);
          break;
        case 'materiales':
          response = await apiService.deleteMaterial(item.id);
          break;
        default:
          return;
      }
      
      if (response.ok) {
        result = await response.json();
        
        // Actualizar lista local
        setData(data.filter(i => i.id !== item.id));
        
        setMessage(`✅ ${result.message || 'Eliminado correctamente'}`);
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.error || 'Error al eliminar'}`);
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      setMessage('❌ Error de conexión al eliminar');
    }
  };

  const handleCreate = () => {
    const newItem = {
      id: null,
      nombre: '',
      descripcion: '',
      foto1: '',
      foto2: '',
      foto3: '',
      titulo: '',
      nivel_curso: '',
      url: '',
      laboratorio_id: '',
      curso_id: ''
    };
    setEditingItem(newItem);
    setMessage('');
  };

  const handleCreateSave = async () => {
    if (!editingItem) return;
    
    setSaving(true);
    setMessage('');
    
    try {
      let response;
      let result;
      
      switch (activeTab) {
        case 'laboratorios':
          response = await apiService.createLaboratorio(editingItem);
          break;
        case 'cursos':
          response = await apiService.createCurso(editingItem);
          break;
        case 'componentes':
          response = await apiService.createComponente(editingItem);
          break;
        case 'materiales':
          response = await apiService.createMaterial(editingItem);
          break;
        default:
          return;
      }
      
      if (response.ok) {
        result = await response.json();
        
        // Recargar lista para obtener el nuevo item con ID
        await loadData();
        
        setEditingItem(null);
        setMessage(`✅ ${result.message || 'Creado correctamente'}`);
        
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.error || 'Error al crear'}`);
      }
    } catch (error) {
      console.error("Error al crear:", error);
      setMessage('❌ Error de conexión al crear');
    } finally {
      setSaving(false);
    }
  };

  const renderList = () => {
    if (loading) {
      return <div style={styles.message}>Cargando...</div>;
    }

    if (data.length === 0) {
      return <div style={styles.message}>No hay {activeTab} disponibles</div>;
    }

    return (
      <div style={styles.listContainer}>
        <div style={styles.listHeader}>
          <button
            onClick={handleCreate}
            style={styles.createButton}
          >
            + Agregar {activeTab.slice(0, -1)}
          </button>
        </div>
        <div style={styles.list}>
          {data.map(item => (
            <div key={item.id} style={styles.listItem}>
              <div style={styles.itemInfo}>
                <strong>{item.nombre}</strong>
                {item.descripcion && (
                  <p style={styles.itemDescription}>
                    {item.descripcion.length > 100 
                      ? item.descripcion.substring(0, 100) + '...'
                      : item.descripcion
                    }
                  </p>
                )}
                {activeTab === 'cursos' && item.nivel_curso && (
                  <p style={styles.itemMeta}>Nivel: {item.nivel_curso}</p>
                )}
                {activeTab === 'componentes' && item.laboratorio && (
                  <p style={styles.itemMeta}>Lab: {item.laboratorio}</p>
                )}
                {activeTab === 'materiales' && item.curso && (
                  <p style={styles.itemMeta}>Curso: {item.curso}</p>
                )}
              </div>
              <div style={styles.itemActions}>
                <button
                  onClick={() => handleEdit(item)}
                  style={styles.editButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  style={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Botón de cerrar sesión en la esquina superior derecha */}
      <button 
        style={styles.logoutButton}
        onClick={handleLogout}
        onMouseEnter={handleLogoutMouseEnter}
        onMouseLeave={handleLogoutMouseLeave}
      >
        Cerrar sesión
      </button>
      
      <h1 style={styles.title}>Panel de Administración</h1>
      
      {message && (
        <div style={{
          ...styles.message,
          ...(message.includes('✅') ? styles.successMessage : styles.errorMessage)
        }}>
          {message}
        </div>
      )}
      
      {renderTabs()}
      {renderList()}
      {renderForm()}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '20px',
    position: 'relative',
  },
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#FF9500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
    zIndex: 10,
  },
  title: {
    fontSize: '36px',
    color: '#FF9500',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: '10px',
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    backgroundColor: '#FF9500',
    color: '#ffffff',
  },
  list: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    transition: 'box-shadow 0.2s ease',
  },
  itemInfo: {
    flex: 1,
  },
  itemDescription: {
    margin: '5px 0 0 0',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#FF9500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  message: {
    textAlign: 'center',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  listContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  listHeader: {
    marginBottom: '20px',
    textAlign: 'right',
  },
  createButton: {
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  itemActions: {
    display: 'flex',
    gap: '8px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  itemMeta: {
    margin: '5px 0 0 0',
    color: '#888',
    fontSize: '12px',
    fontStyle: 'italic',
  },
  formOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
  formTitle: {
    fontSize: '24px',
    color: '#FF9500',
    fontWeight: 'bold',
    marginBottom: '25px',
    textAlign: 'center',
  },
  field: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '25px',
  },
  button: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  saveButton: {
    backgroundColor: '#FF9500',
    color: '#ffffff',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#ffffff',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
};

export default AdminInterface;
