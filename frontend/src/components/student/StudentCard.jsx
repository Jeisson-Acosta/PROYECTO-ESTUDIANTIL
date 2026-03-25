import React from 'react';
import '../../styles/common/StudentCard.css';

export function StudentCard({titulo,valor,adicional,Icono}) {
    return (
        <div className="stats-content">
        <header className='title-stat'>
                <h4>{titulo}</h4>
        </header>
        <div className='summary-stat'>
              <span className='value-stat'>{valor}</span>
        <div className='icon-stat'>
            {Icono && <Icono/>}
        </div>
             
        </div>
        <footer>
           <p>{adicional}</p>
        </footer>
            
           
        </div>
    );
}
