import '../../styles/docent/CardTaskByQualify.css'
export function CardTaskByQualify({ task }) {
    return (
        <div className="card-by-qualify">
            <header>
                <h4 className='title-task-by-qualify'>
                    {task.astnomtrabajo}
                </h4>
                <button>
                    Ver
                </button>
            </header>
            <div className="info-task-by-qualify">
                <span>
                    Fecha ent: {task.atefec_entrega}
                </span>
                <span>
                    Curso: {task.edcnom}
                </span>
            </div>
        </div>
    )
}