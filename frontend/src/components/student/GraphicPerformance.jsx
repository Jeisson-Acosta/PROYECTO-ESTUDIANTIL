import React from 'react';
import '../../styles/student/GraphicPerformance.css';

const materias = [
  { id: 1, nombre: 'Cálculo Diferencial', nota: 4.8, color: '#8884d8', icon: '∑' },
  { id: 2, nombre: 'Física Mecánica', nota: 3.2, color: '#ffc658', icon: '⚛' },
  { id: 3, nombre: 'Programación II', nota: 4.5, color: '#82ca9d', icon: '<>' },
];

const DesempeñoMaterias = () => {
  return (
    <div className='desempeño-materias'>
      
      {/* Header de la tarjeta */}
      <div className='desempeño-materias-header'>
        <h3>Desempeño por Materia</h3>
        <a href="#" >Ver todas</a>
      </div>

      {/* Lista de Materias */}
      {materias.map((materia) => (
        <div key={materia.id} style={{ marginBottom: '20px' }}>
          <div classname ='lista-materias'style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {/* Icono con fondo suave */}
            <div className ='lista-icon' style={{
              backgroundColor: `${materia.color}20`,
              color: materia.color,
            }}>
               {materia.icon}
            </div>

            {/* Nombre y Nota */}
            <div className='lista-nombre-nota'>
              <div className='lista-nombre-nota-container' >
                <span className='lista-nombre'>{materia.nombre}</span>
                <span className='lista-nota'>{materia.nota}</span>
              </div>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className='prore' style={{ width: '100%', height: '8px', backgroundColor: '#EDF2F7', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              width: `${(materia.nota / 5) * 100}%`, // Asumiendo escala de 0 a 5
              height: '100%',
              backgroundColor: materia.color,
              borderRadius: '10px',
              transition: 'width 1s ease-in-out'
            }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesempeñoMaterias;