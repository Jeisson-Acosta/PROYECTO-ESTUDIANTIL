import '../../styles/docent/CardNextClass.css'
export function CardNextClass({ itemClass }) {
    return (
        <div key={itemClass.ashid} className='card-next-class-docent'>
            <header>
                <h4 className='name-course'>
                    {itemClass.asgnom}
                </h4>
                <span className='hour-course'>
                    {itemClass.ashhora}
                </span>
            </header>
            <span className='info-course'>
                {itemClass.edcnom} - Salón {itemClass.cesnum}
            </span>
        </div>
    )
}