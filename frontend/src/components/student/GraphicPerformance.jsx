import React from 'react';
import { useContext } from 'react';
import '../../styles/student/GraphicPerformance.css';
import { UserLoginContext } from '../../context/userLogin';

const DesempeñoMaterias = () => {
  const { userLogin } = useContext(UserLoginContext) || {};
  
  // Manejar diferentes formatos de datos
  let materiasData = [];
  
  if (userLogin?.promedio_ciclo) {
    // Si es un string, parsearlo
    if (typeof userLogin.promedio_ciclo === 'string') {
      try {
        materiasData = JSON.parse(userLogin.promedio_ciclo);
      } catch (e) {
        console.error('Error parsing promedio_ciclo:', e);
        materiasData = [];
      }
    } 
    // Si ya es un array, usarlo directamente
    else if (Array.isArray(userLogin.promedio_ciclo)) {
      materiasData = userLogin.promedio_ciclo;
    }
    else if (typeof userLogin.promedio_ciclo === 'object') {
      materiasData = [userLogin.promedio_ciclo];
    }
  }
  
  console.log('materiasData después del parseo:', materiasData);
  console.log('¿Es array?', Array.isArray(materiasData));
  
  // Función para obtener icono según el iconName
  const getIconForSubject = (iconName) => {
    const iconMap = {
      'person-coding': '💻',
      'sailor': '⛵',
      'rocket-launch': '🚀',
      'bicycle': '🚲',
      'data-storage': '💾',
      'default': '📚'
    };
    return iconMap[iconName] || iconMap.default;
  };


  const materiasFormateadas = Array.isArray(materiasData) ? materiasData.map((materia, index) => ({
    id: materia.asgid || index,
    nombre: materia.nombre_materia,
    nota: materia.nota_ciclo,
    color: `#${materia.color_materia?.color || 'cccccc'}`,
    icon: getIconForSubject(materia.color_materia?.iconName)
  })) : [];

  console.log('Materias formateadas:', materiasFormateadas);

  return (
    <div className='desempeño-materias'>
      {/* Header de la tarjeta */}
      <div className='desempeño-materias-header'>
        <h3>Desempeño por Materia</h3>
        <a href="#">Ver todas</a>
      </div>

      {/* Lista de Materias */}
      {materiasFormateadas.length > 0 ? (
        materiasFormateadas.map((materia) => (
          <div key={materia.id} style={{ marginBottom: '20px' }}>
            <div className='lista-materias' style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {/* Icono con fondo suave */}
              <div className='lista-icon' style={{
                backgroundColor: `${materia.color}20`,
                color: materia.color,
              }}>
                {materia.icon}
              </div>

              {/* Nombre y Nota */}
              <div className='lista-nombre-nota' style={{ flex: 1 }}>
                <div className='lista-nombre-nota-container' style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <span className='lista-nombre' style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2D3748'
                  }}>{materia.nombre}</span>
                  <span className='lista-nota' style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: materia.color
                  }}>{materia.nota.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className='prore' style={{ 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#EDF2F7', 
              borderRadius: '10px', 
              overflow: 'hidden' 
            }}>
              <div style={{
                width: `${(materia.nota / 5) * 100}%`,
                height: '100%',
                backgroundColor:`${materia.color}20`,
                borderRadius: '10px',
                transition: 'width 1s ease-in-out'
              }} />
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: '#718096' }}>
          No hay datos de materias disponibles
        </div>
      )}
    </div>
  );
};

export default DesempeñoMaterias;