import React from 'react';
import '../../styles/common/MateriasCard.css'
export function MateriasCard({titulo,aula,hora,profesor}) {
    return (
        <div className='materias-card'>
        <div className='title-subject'>
              <h1>{titulo}</h1>
              <p className='hora'>{hora}</p>
         </div>
        <div className='room-subject'>
               <p>{aula}</p>
        </div>
        <div className='teacher-subject'>
         <p>{profesor}</p>
        </div>
            

          
        </div>
    )
}
