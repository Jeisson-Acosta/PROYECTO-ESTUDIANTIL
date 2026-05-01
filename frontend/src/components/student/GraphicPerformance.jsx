import React from 'react';
import { useContext } from 'react';
import '../../styles/student/GraphicPerformance.css';
import { UserLoginContext } from '../../context/userLogin';

const DesempeñoMaterias = () => {
  const { userLogin } = useContext(UserLoginContext) || {};
  
  let materiasData = [];
  
  if (userLogin?.promedio_ciclo) {
    if (typeof userLogin.promedio_ciclo === 'string') {
      try {
        materiasData = JSON.parse(userLogin.promedio_ciclo);
      } catch (e) {
        materiasData = [];
      }
    } 
    else if (Array.isArray(userLogin.promedio_ciclo)) {
      materiasData = userLogin.promedio_ciclo;
    }
    else if (typeof userLogin.promedio_ciclo === 'object') {
      materiasData = [userLogin.promedio_ciclo];
    }
  }

  
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


  return (
    <div className='desempeño-materias'>
      <div className='desempeño-materias-header'>
        <h3>Desempeño por Materia</h3>
        <a href="#">Ver todas</a>
      </div>

      
      {materiasFormateadas.length > 0 ? (
        materiasFormateadas.map((materia) => (
          <div key={materia.id} style={{ marginBottom: '20px' }}>
            <div className='lista-materias' style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <div className='lista-icon' style={{
                backgroundColor: `${materia.color}20`,
                color: materia.color,
              }}>
                {materia.icon}
              </div>


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