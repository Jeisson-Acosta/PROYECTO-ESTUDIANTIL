import nutriaPrincipal from '../../assets/nutria_principal.png'
import '../../styles/auth/Register.css'

export function Register(){
    return (
        <div className='container-all-register'>
            <div className='container-principal-register'>
                  <div className='container-info-registe'>
                    <div className='image-register'>
                    <img src={nutriaPrincipal} width='100px' height='150px' />
                    </div>
                    <div className='title-register'>
                        <h2></h2>
                        <p></p>
                    </div>
                  </div>
            <form className='form-register'>
                <header>
                    <h2>Crea una cuenta</h2>
                    <p>Introduce tus datos personales</p>
                </header>
            <div className='fields-form-register'>
            <div className='fields-form'>
                <label>
                    
                </label>
            </div>
            </div>
               
            </form>

            </div>
          
        </div>
    )
}
