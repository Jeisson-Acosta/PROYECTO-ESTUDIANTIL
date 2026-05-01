import "../../styles/common/classes/Calendar.css/CalendarClass.css";

export function CalendarClassCard({ estado, nombre_clase, salon, icon }) {
    return (
        <section className="calendar-classes-cards">
            <div className="calendar-classes-text">
                <header className='class-state'>
                    <h4>{estado}</h4>
                </header>
                <div className='class-name'>
                    <span>{nombre_clase}</span>
                </div>
                <footer className="class-room">
                    <p>{salon}</p>
                </footer>    
            </div> 
            <div className="class-icon">
                {icon}
            </div>
        </section>
    );
}
